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
            cmd.CommandText = @"SELECT * FROM elections WHERE election_id = @id";
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = id

            });
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result[0] : null;
        }


        public async Task<Election?> getOne(int id)
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
        }


        public async Task<List<Election>> filterElections(int page, ElectionsFilter filter)
        {
            using var cmd = db.Connection.CreateCommand();
            string query = filter.queryStringSelect;
            query += $" limit 10 offset {(page-1)*10};";
            cmd.CommandText = query;
            return await ReadAsync(await cmd.ExecuteReaderAsync());
        }


        public async Task<Tuple<int,int>> getCountFilterElections(ElectionsFilter filter)
        {
            using var cmd = db.Connection.CreateCommand();
            string query = filter.queryStringCount;
            cmd.CommandText = query;
            int filterCount = Convert.ToInt32(await cmd.ExecuteScalarAsync());
            cmd.CommandText = filter.querySelectCount;
            int allCount = Convert.ToInt32(await cmd.ExecuteScalarAsync());
            return Tuple.Create(allCount, filterCount);
        }


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
                    };
                    list.Add(election);
                }
            }
            return list;
        }


        private async Task<List<Election>> ReadAsync(DbDataReader reader)
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
        }
    }
}
