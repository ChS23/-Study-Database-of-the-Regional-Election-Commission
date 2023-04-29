using ElectionBack.Modules;
using System.Data.Common;
using MySqlConnector;
using ElectionBack.Models;


namespace ElectionBack.DBModels
{
    public class CandidateTableQuery
    {
        public DBConnect db { get; }

        public CandidateTableQuery(DBConnect _db)
        {
            db = _db;
        }


        /*public async Task<List<CandidateTable>> findAll()
        {
            using var cmd = db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT * FROM candidates;";
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }*/


        public async Task<CandidateTable?> findOne(int id)
        {
            using var cmd = db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT c.candidate_id, c.full_name, c.id_party, c.birthday, pp.name_party FROM candidates c join political_party pp on c.id_party = pp.party_id WHERE candidate_id = @id";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = System.Data.DbType.Int32,
                Value = id

            });
            var result = await ReadAllAsync(await cmd .ExecuteReaderAsync());
            return result.Count > 0 ? result[0] : null;
        }


        /*public async Task<List<CandidateTable>> findFromTo(int count, int skip)
        {
            using var cmd = db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT * FROM elections.candidates LIMIT @from offset @to";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@from",
                DbType = System.Data.DbType.Int32,
                Value = count
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@to",
                DbType = System.Data.DbType.Int32,
                Value = skip
            });
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }*/


        public async Task<List<CandidateTable>> filterCandidate(int page, CandidateFilter filter)
        {
            using var cmd = db.Connection.CreateCommand();
            string query = "SELECT c.candidate_id, c.full_name, c.id_party, c.birthday, pp.name_party FROM candidates c join political_party pp on c.id_party = pp.party_id ";
            if (filter.getWhereQuery is not null) query += filter.getWhereQuery;
            query += $" order by id_party ";
            query += $" limit 10 offset {(page - 1) * 10}";
            cmd.CommandText = query;
            BindParams(cmd, filter);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }
        

        public async Task<Tuple<int,int>> getCountFilterCandidates(CandidateFilter filter)
        {
            using var cmd = db.Connection.CreateCommand();
            string query = "SELECT count(*) FROM candidates ";
            cmd.CommandText = query;
            int allCount = Convert.ToInt32(await cmd.ExecuteScalarAsync());
            if (filter.getWhereQuery is not null) query += filter.getWhereQuery;
            cmd.CommandText = query;
            BindParams(cmd, filter);
            int filterCount = Convert.ToInt32(await cmd.ExecuteScalarAsync());
            return Tuple.Create(allCount, filterCount);
        }


        // getCountFilterCandidates
        public async Task<int> getNumberRowCandidates(int id, CandidateFilter filter)
        {
            using var cmd = db.Connection.CreateCommand();
            string query = "select row_num from (select c.candidate_id, row_number() over (order by c.id_party desc) as row_num from candidates c";
            if (filter.getWhereQuery is not null) query += filter.getWhereQuery;
            query += ") as t where candidate_id = @id";
            cmd.CommandText = query;
            BindId(cmd, id);
            return Convert.ToInt32(await cmd.ExecuteScalarAsync());
        }


        // getPartyDict
        public async Task<Dictionary<string, int>> getPartyDict()
        {
            using var cmd = db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT party_id, name_party FROM political_party";
            var result = await cmd.ExecuteReaderAsync();
            var dict = new Dictionary<string, int>();
            using (result)
            {
                while (await result.ReadAsync())
                {
                    dict.Add(result.GetString(1), result.GetInt32(0));
                }
            }
            return dict;
        }


        private async Task<List<CandidateTable>> ReadAllAsync(DbDataReader reader)
        {
            var list = new List<CandidateTable>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var candidate = new CandidateTable(db)
                    {
                        candidate_id = reader.GetInt32(0),
                        full_name = reader.GetString(1),
                        id_party = reader[2] is DBNull ? -1 : reader.GetInt32(2),
                        birthday = reader.GetDateTime(3).ToString("yyyy-MM-dd"),
                        party_name = reader.GetString(4),
                    };
                    list.Add(candidate);
                }
            }
            return list;
        }


        private void BindId(MySqlCommand cmd, int id)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = System.Data.DbType.Int32,
                Value = id
            });
        }


        private void BindParams(MySqlCommand cmd, CandidateFilter filter)
        {
            if (filter.getFilterNameSQL is not null)
            {
                cmd.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "@filterName",
                    DbType = System.Data.DbType.String,
                    Value = filter.getFilterNameSQL
                });
            }
        }
        
    }
}
