namespace ElectionBack.Models
{
    public class Candidate
    {
        public int candidate_id { get; set; }
        public string full_name { get; set; }
        public int age { get; set; }
        public int id_party { get; set; }

        public Candidate(int candidate_id, string full_name, int age, int id_party)
        {
            this.candidate_id = candidate_id;
            this.full_name = full_name;
            this.age = age;
            this.id_party = id_party;
        }
    }
}
