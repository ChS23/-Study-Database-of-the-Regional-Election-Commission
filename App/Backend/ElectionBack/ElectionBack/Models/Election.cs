namespace ElectionBack.Models
{
    public class Election
    {
        public int election_id { get; set; }
        public string name_of_the_election { get; set; }
        public string election_date { get; set; }
        public int number_of_deputy_mandates { get; set; }
        public string ple { get; set; }

        public Election(int _election_id, string _election_name, string _election_date, int _number_of_deputy_mandates, string _ple)
        {
            election_id = _election_id;
            name_of_the_election = _election_name;
            election_date = _election_date;
            number_of_deputy_mandates = _number_of_deputy_mandates;
            ple = _ple;
        }

        public Election()
        {
        }
    }
}
