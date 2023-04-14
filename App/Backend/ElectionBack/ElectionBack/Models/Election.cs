namespace ElectionBack.Models
{
    public class Election
    {
        public int election_id { get; set; }
        public string election_name { get; set; }
        public string election_date { get; set; }
        public string number_of_deputy_mandates { get; set; }
        public int id_ple { get; set; }

        public Election(int _election_id, string _election_name, string _election_date, string _number_of_deputy_mandates, int _id_ple)
        {
            election_id = _election_id;
            election_name = _election_name;
            election_date = _election_date;
            number_of_deputy_mandates = _number_of_deputy_mandates;
            id_ple = _id_ple;
        }
    }
}
