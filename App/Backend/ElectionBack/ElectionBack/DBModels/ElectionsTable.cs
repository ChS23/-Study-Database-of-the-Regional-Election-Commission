using ElectionBack.Modules;
using MySqlConnector;
using System.Data;

namespace ElectionBack.DBModels
{
    public class ElectionsTable
    {
        public int election_id { get; set; }
        public string name_of_the_election { get; set; }
        public string election_date { get; set; }
        public int number_of_deputy_mandates { get; set; }
        public int id_public_legal_entitie { get; set; }
        public string ple_title { get; set; }

        internal DBConnect DB { get; set; }

        public ElectionsTable() { }


        public void Copy(ElectionsTable data)
        {
            name_of_the_election = data.name_of_the_election;
            election_date = data.election_date;
            number_of_deputy_mandates = data.number_of_deputy_mandates;
            id_public_legal_entitie = data.id_public_legal_entitie;
        }


        internal ElectionsTable(DBConnect db)
        {
            DB = db;
        }

        public async Task InsertAsync()
        {
            using var cmd = DB.Connection.CreateCommand();
            cmd.CommandText = @"INSERT INTO `elections` VALUES (NULL, @name, @date, @num, @ple);";
            BindParams(cmd);
            await cmd.ExecuteNonQueryAsync();
            election_id = (int)cmd.LastInsertedId;
        }


        public async Task UpdateAsync()
        {
            using var cmd = DB.Connection.CreateCommand();
            cmd.CommandText = @"UPDATE `elections` SET `name_of_the_election` = @name, `election_date` = @date, `number_of_deputy_mandates` = @num, `id_public_legal_entitie` = @ple WHERE `election_id` = @id;";
            BindParams(cmd);
            BindId(cmd);
            await cmd.ExecuteNonQueryAsync();
        }


        public async Task DeleteAsync()
        {
            using var cmd = DB.Connection.CreateCommand();
            cmd.CommandText = @"DELETE FROM `elections` WHERE `election_id` = @id;";
            BindId(cmd);
            await cmd.ExecuteNonQueryAsync();
        }


        private void BindId(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = election_id
            });
        }


        private void BindParams(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@name",
                DbType = DbType.String,
                Value = name_of_the_election
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@date",
                DbType = DbType.String,
                Value = election_date
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@num",
                DbType = DbType.Int32,
                Value = number_of_deputy_mandates
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@ple",
                DbType = DbType.Int32,
                Value= id_public_legal_entitie
            });
        }
    }
}
