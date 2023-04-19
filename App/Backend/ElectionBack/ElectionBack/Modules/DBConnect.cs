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