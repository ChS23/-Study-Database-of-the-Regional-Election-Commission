using ElectionBack.DBModels;


namespace ElectionBack.Models
{
    public class OutCandidates
    {
        List<CandidateTable> candidates;
        Tuple<int, int> counts;
    }

    public class OutElections
    {
        List<ElectionsTable> elections;
        Tuple<int, int> counts;
    }

}
