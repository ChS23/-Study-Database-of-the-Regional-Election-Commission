using ElectionBack.Modules;
using System.Data.Common;
using MySqlConnector;
using ElectionBack.Models;


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
                DbType = System.Data.DbType.Int32,
                Value = id

            });
            var result = await ReadAllAsync(await cmd.ExecuteReaderAsync());
            return result.Count > 0 ? result[0] : null;
        }


        public async Task<List<ElectionsTable>> filterElections(int from, int to, ElectionsFilter filter)
        {
            using var cmd = db.Connection.CreateCommand();
            string query = filter.queryString;
            query += $" limit {to-from} offset {from};";
            cmd.CommandText = query;
            return await ReadAllAsync(await cmd.ExecuteReaderAsync());
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
                        election_date = reader.GetString(2),
                        number_of_deputy_mandates = reader.GetInt32(3),
                        id_public_legal_entitie = reader.GetInt32(4),
                    };
                    list.Add(election);
                }
            }
            return list;
        }
    }
}
