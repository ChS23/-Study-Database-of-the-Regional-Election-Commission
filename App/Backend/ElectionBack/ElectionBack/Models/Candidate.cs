namespace ElectionBack.Models
{
    public class Candidate
    {
        public int candidate_id { get; set; }
        public string full_name { get; set; }
        public string birthday { get; set; }
        public int id_party { get; set; }

        public Candidate(int candidate_id, string full_name, string birthday, int id_party)
        {
            this.candidate_id = candidate_id;
            this.full_name = full_name;
            this.birthday = birthday;
            this.id_party = id_party;
        }
    }
}
