using MySqlConnector;


namespace ElectionBack.Modules
{
    public class DBConnect : IDisposable
    {
        public MySqlConnection Connection { get; }

        public DBConnect()
        {
            MySqlConnectionStringBuilder connstring = new MySqlConnectionStringBuilder();
            connstring.Server = "localhost";
            connstring.Port = 3306;
            connstring.UserID = "root";
            connstring.Password = "1234qwer";
            connstring.Database = "elections";

            Connection = new MySqlConnection(connstring.ToString());
        }

        public void Dispose() => Connection.Dispose();
    }
}




/*
namespace ElectionBack.Modules
{
    public class DBConnect : IDisposable
    {
        private MySqlConnection connection;
        

        public DBConnect()
        {
            // connection = new MySqlConnection("server=localhost;user=root;database=elections;port=3306;password=1234qwer");
            MySqlConnectionStringBuilder connstring = new MySqlConnectionStringBuilder();
            connstring.Server = "localhost";
            connstring.Port = 3306;
            connstring.UserID = "root";
            connstring.Password = "1234qwer";
            connstring.Database = "elections";

            connection = new MySqlConnection(connstring.ToString());
        }

        private bool openConnection()
        {
            try
            {
                connection.Open();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }


        private bool closeConnection()
        {
            try
            {
                connection.Close();
                return true;
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine(ex.Message);
                return false;
            }
        }


        public List<Models.Candidate> GetAll()
        {
            if (openConnection())
            {
                string querty = "SELECT * FROM elections.candidates LIMIT 10;";

                MySqlCommand cmd = new MySqlCommand(querty, connection);
                MySqlDataReader dataReader = cmd.ExecuteReader();

                List<Models.Candidate> candidates = new List<Models.Candidate>();
                while (dataReader.Read())
                {
                    candidates.Add(new Models.Candidate(Convert.ToInt32(dataReader[0]), dataReader[1].ToString(), Convert.ToInt32(dataReader[2]), Convert.ToInt32(dataReader[3] is DBNull ? null : dataReader[3])));
                }

                dataReader.Close();
                closeConnection();

                return candidates;
            }
            else
            {
                return new List<Models.Candidate>();
            }
        }
    }
}
*/
