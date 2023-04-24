using System.Data;
using ElectionBack.Modules;
using MySqlConnector;


namespace ElectionBack.DBModels
{
    public class CandidateTable
    {
        public int candidate_id { get; set; }
        public string full_name { get; set; }
        public string birthday { get; set; }
        public int id_party { get; set; }

        public string party_name { get; set; }

        internal DBConnect DB { get; set; }

        public CandidateTable() {}

        public void Copy(CandidateTable table)
        {
            full_name = table.full_name;
            birthday = table.birthday;
            id_party = table.id_party;
        }

        internal CandidateTable(DBConnect db)
        {
            DB = db;
        }

        public async Task InsertAsync()
        {
            using var cmd = DB.Connection.CreateCommand();
            cmd.CommandText = @"INSERT INTO `candidates` VALUES (NULL, @fn, @idp, @birthday);";
            BindParams(cmd);
            await cmd.ExecuteNonQueryAsync();
            candidate_id = (int)cmd.LastInsertedId;
        }


        public async Task UpdateAsync()
        {
            using var cmd = DB.Connection.CreateCommand();
            cmd.CommandText = @"UPDATE `candidates` SET `full_name` = @fn, `birthday` = @birthday, `id_party` = @idp WHERE `candidate_id` = @id;";
            BindParams(cmd);
            BindId(cmd);
            await cmd.ExecuteNonQueryAsync();
        }


        public async Task DeleteAsync()
        {
            using var cmd = DB.Connection.CreateCommand();
            cmd.CommandText = @"DELETE FROM `candidates` WHERE `candidate_id` = @id;";
            BindId(cmd);
            await cmd.ExecuteNonQueryAsync();
        }

        private void BindId(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@id",
                DbType = DbType.Int32,
                Value = candidate_id
            });
        }


        private void BindParams(MySqlCommand cmd)
        {
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@fn",
                DbType = DbType.String,
                Value = full_name
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@birthday",
                DbType = DbType.String,
                Value = birthday
            });
            cmd.Parameters.Add(new MySqlParameter
            {
                ParameterName = "@idp",
                DbType = DbType.Int32,
                Value = id_party == -1 ? null : id_party
            });
        }
    }
}
