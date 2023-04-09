using ElectionBack.Models;
using Microsoft.AspNetCore.Hosting.Server;
using MySql.Data.MySqlClient;


namespace ElectionBack.Modules
{
    public class DBService
    {
        // MySqlConnectionStringBuilder connectString = new MySqlConnectionStringBuilder();
        // private readonly string connectString = "SERVER=localhost;DATABASE=elections;UID=root;PASSWORD=1234qwer;";
        private readonly string connectString = "Server=localhost;Database=elections;Uid=root;Pwd=1234qwer;";

        private MySqlConnection connection { get; set; }

        public DBService() => connection = new MySqlConnection(connectString);

        private bool OpenConnection
        {
            get
            {
                try
                {
                    connection.Open();
                    return true;
                }
                catch(Exception ex)
                {
                    System.Diagnostics.Debug.WriteLine(ex.Message);
                    return false;
                }
            }
        }

        private bool CloseConnection
        {
            get
            {
                try
                {
                    connection.Close();
                    return true;
                }
                catch { return false; }
            }
        }

        public List<Models.Candidate> GetAll() 
        {
            if (OpenConnection)
            {
                string querty = "SELECT * FROM elections.candidates LIMIT 10;";

                MySqlCommand cmd = new MySqlCommand(querty, connection);
                MySqlDataReader dataReader = cmd.ExecuteReader();
                _ = CloseConnection;

                List<Models.Candidate> candidates = new List<Models.Candidate>();
                while (dataReader.Read())
                {
                    candidates.Add(new Models.Candidate(Convert.ToInt32(dataReader["condidate_id"]), dataReader["full_name"].ToString(), Convert.ToInt32(dataReader["age"]), Convert.ToInt32(dataReader["id_party"])));
                }

                dataReader.Close();

                return candidates;
            }
            else
            {
                return new List<Models.Candidate>();
            }
        }
    }
}
