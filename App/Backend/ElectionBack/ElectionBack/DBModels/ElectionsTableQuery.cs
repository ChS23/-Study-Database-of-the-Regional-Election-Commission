using ElectionBack.Modules;
using System.Data.Common;
using MySqlConnector;
using ElectionBack.Models;
using System.Data;


namespace ElectionBack.DBModels
{
    public class ElectionsTableQuery
    {
        public DBConnect db { get; }

        public ElectionsTableQuery(DBConnect _db)
        {
            db = _db;
        }


        public async Task<ElectionsTable?> findOne(int id)
        {
            using var cmd = db.Connection.CreateCommand();
            cmd.CommandText = @"select e.election_id, e.name_of_the_election, e.election_date, e.number_of_deputy_mandates, e.id_public_legal_entitie, ple.title from elections e join public_legal_entities ple on e.id_public_legal_entitie = ple.public_legal_entitie_id where e.election_id = @id";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = id

            });
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result[0] : null;
        }


        /*public async Task<Election?> getOne(int id)
        {
            using var cmd = db.Connection.CreateCommand();
            cmd.CommandText = @"with t as (SELECT e.election_id, e.name_of_the_election, e.election_date, e.number_of_deputy_mandates, ple.title from elections e join public_legal_entities ple on e.id_public_legal_entitie = ple.public_legal_entitie_id where election_id = @id) select * from t";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = System.Data.DbType.Int32,
                Value = id

            });
            var result = await ReadAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result[0] : null;
        }*/

        // getNumberRow
        // out row number
        public async Task<int> getNumberRow(int id, ElectionsFilter filter)
        {
            using var cmd = db.Connection.CreateCommand();
            string query = filter.queryNumberRow;
            BindId(cmd, id);
            cmd.CommandText = query;
            return Convert.ToInt32(await cmd.ExecuteScalarAsync());
        }


        public async Task<List<ElectionsTable>> filterElections(int page, ElectionsFilter filter)
        {
            using var cmd = db.Connection.CreateCommand();
            string query = filter.queryStringSelect;
            query += $" order by e.election_date desc";
            query += $" limit 10 offset {(page-1)*10};";
            cmd.CommandText = query;
            BindParams(cmd, filter);
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
        }


        public async Task<Tuple<int,int>> getCountFilterElections(ElectionsFilter filter)
        {
            using var cmd = db.Connection.CreateCommand();
            string query = filter.queryStringCount;
            cmd.CommandText = query;
            BindParams(cmd, filter);
            int filterCount = Convert.ToInt32(await cmd.ExecuteScalarAsync());
            cmd.CommandText = filter.querySelectCount;
            int allCount = Convert.ToInt32(await cmd.ExecuteScalarAsync());
            return Tuple.Create(allCount, filterCount);
        }

      
        public async Task<Dictionary<string, int>> GetPleDictionary()
        {
            using var cmd = db.Connection.CreateCommand();
            // cmd.CommandText = $"select title, public_legal_entitie_id from public_legal_entities where title like '{inputString}%' limit 5";
            cmd.CommandText = "select title, public_legal_entitie_id from public_legal_entities";
            var result = await cmd.ExecuteReaderAsync();
            var answer = new Dictionary<string, int>();
            using (result)
            {
                while (await result.ReadAsync())
                {
                    answer.Add(result.GetString(0), result.GetInt32(1));
                }
            }
            return answer;
        }

        /*
        public async Task<string?> GetPleName(int pleID)
        {
            using var cmd = db.Connection.CreateCommand();
            cmd.CommandText = $"select title from public_legal_entities where public_legal_entitie_id = {pleID}";
            var result = Convert.ToString(await cmd.ExecuteScalarAsync());
            return result is not null ? result : null;
        }*/


        private async Task<List<ElectionsTable>> ReadAllAsync(DbDataReader reader)
        {
            var list = new List<ElectionsTable>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var election = new ElectionsTable(db)
                    {
                        election_id = reader.GetInt32(0),
                        name_of_the_election = reader.GetString(1),
                        election_date = reader.GetDateTime(2).ToString("yyyy-MM-dd"),
                        number_of_deputy_mandates = reader.GetInt32(3),
                        id_public_legal_entitie = reader.GetInt32(4),
                        ple_title = reader.GetString(5),
                    };
                    list.Add(election);
                }
            }
            return list;
        }


        private void BindId(MySqlCommand cmd, int id)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@e_id",
                DbType = DbType.Int32,
                Value = id
            });
        }


        private void BindParams(MySqlCommand cmd, ElectionsFilter filter)
        {
            if (filter.getNameSearch is not null)
            {
                cmd.Parameters.Add(new MySqlParameter { 
                    ParameterName = "@nameSearch",
                    DbType = DbType.String,
                    Value = filter.nameSearch,
                });
            }
            if (filter.getPLESearch is not null)
            {
                cmd.Parameters.Add(new MySqlParameter
                {
                    ParameterName = "@pleSearch",
                    DbType= DbType.String,
                    Value = filter.pleSearch,
                });
            }
        }


        /*private async Task<List<Election>> ReadAsync(DbDataReader reader)
        {
            var list = new List<Election>();
            using (reader)
            {
                while (await reader.ReadAsync())
                {
                    var election = new Election()
                    {
                        election_id = reader.GetInt32(0),
                        name_of_the_election = reader.GetString(1),
                        election_date = reader.GetDateTime(2).ToString("yyyy-MM-dd"),
                        number_of_deputy_mandates = reader.GetInt32(3),
                        ple = reader.GetString(4),
                    };
                    list.Add(election);
                }
            }
            return list;
        }*/
    }
}
