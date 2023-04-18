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


        public async Task<List<CandidateTable>> findAll()
        {
            using var cmd = db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT * FROM candidates;";
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }


        public async Task<CandidateTable?> findOne(int id)
        {
            using var cmd = db.Connection.CreateCommand();
            cmd.CommandText = @"SELECT * FROM candidates WHERE condidate_id = @id";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = System.Data.DbType.Int32,
                Value = id

            });
            var result = await ReadAllAsync(await cmd .ExecuteReaderAsync());
            return result.Count > 0 ? result[0] : null;
        }


        public async Task<List<CandidateTable>> findFromTo(int count, int skip)
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
        }


        public async Task<List<CandidateTable>> filterCandidate(int from, int to, CandidateFilter filter)
        {
            using var cmd = db.Connection.CreateCommand();
            string query = "SELECT * FROM candidates ";
            if (filter.getWhereQuery is not null) query += filter.getWhereQuery;
            query += $" limit {to - from} offset {from}";
            cmd.CommandText = query;
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
            int filterCount = Convert.ToInt32(await cmd.ExecuteScalarAsync());
            return Tuple.Create(allCount, filterCount);
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
                        age = reader.GetInt32(2),
                        id_party = reader[3] is DBNull ? -1 : reader.GetInt32(3),
                    };
                    list.Add(candidate);
                }
            }
            return list;
        }
    }
}
