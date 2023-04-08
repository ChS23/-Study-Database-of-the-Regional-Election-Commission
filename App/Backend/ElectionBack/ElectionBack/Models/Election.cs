namespace ElectionBack.Models
{
    public class Election
    {
        public int election_id { get; set; }
        public string election_name { get; set; }
        public string election_date { get; set; }
        public string number_of_deputy_mandates { get; set; }
        public int id_ple { get; set; }
    }
}
