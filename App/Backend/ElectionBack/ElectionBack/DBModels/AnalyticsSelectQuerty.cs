using ElectionBack.Modules;
using MySqlConnector;
using System.Reflection.PortableExecutable;


namespace ElectionBack.DBModels
{
    public class AnalyticsSelectQuerty
    {
        public DBConnect db { get; }


        public AnalyticsSelectQuerty(DBConnect _db)
        {
            db = _db;
        }


        public async Task<Dictionary<string,int>> GetCountCandidatsPartyFromElections(int elections_id)
        {
            using var cmd = db.Connection.CreateCommand();
            cmd.CommandText = $"SELECT p.name_party, COUNT(DISTINCT c.candidate_id) AS number_of_candidates FROM candidates c JOIN candidates_to_elections cte ON c.candidate_id = cte.id_candidate JOIN political_party p ON c.id_party = p.party_id where cte.id_election = {elections_id} GROUP BY p.party_id ORDER BY number_of_candidates DESC;";
            var result = await cmd.ExecuteReaderAsync();
            var answer = new Dictionary<string, int>();
            using (result)
            {
                while (await result.ReadAsync())
                {
                    answer.Add(result.GetString(0),result.GetInt32(1));
                }
            }
            return answer;
        }


        public async Task<Dictionary<string,int>> GetGroupAgeInParty(int party_id)
        {
            using var cmd = db.Connection.CreateCommand();
            cmd.CommandText = $"call getGroupAgeParty({party_id});";
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


        public async Task<Dictionary<string,int>> GetPLEId(string string)
    }
}
