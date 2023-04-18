namespace ElectionBack.Models
{
    public class CandidateFilter
    {
        public string? filterName { get; set; } = null;
        public int? ageFrom { get; set; } = null;
        public int? ageTo { get; set; } = null;
        public int? party { get; set; } = -1;

        public CandidateFilter(string? filterName, int? ageFrom, int? ageTo, int? party)
        {
            this.filterName = filterName;
            this.ageFrom = ageFrom;
            this.ageTo = ageTo;
            this.party = party;
        }


        public string? getWhereQuery
        {
            get
            {
                string? query = "";
                List<string> value = new List<string>();
                if (getFilterNameSQL is not null)
                {
                    value.Add(getFilterNameSQL);
                }
                if (getAgeSQL is not null)
                {
                    value.Add(getAgeSQL);
                }
                if (getPartySQL is not null)
                {
                    value.Add(getPartySQL);
                }
                if (value.Count > 0)
                {
                    query += String.Join(" and ", value);
                }
                if (!String.IsNullOrEmpty(query))
                {
                    return "where " + query;
                }
                else
                {
                    return null;
                }
            }
        }


        public string? getFilterNameSQL
        {
            get
            {
                if (filterName is null)
                {
                    return null;
                }
                else
                {
                    return $"full_name LIKE '{this.filterName}%'";
                }
            }
        }


        public string? getAgeSQL
        {
            get
            {
                if (ageFrom is null && ageTo is null)
                {
                    return null;
                }
                else if (ageFrom is null && ageTo is not null)
                {
                    return $"age <= {this.ageTo}";
                }
                else if (ageFrom is not null && ageTo is null)
                {
                    return $"age >= {this.ageFrom}";
                }
                else if (ageFrom is not null && ageTo is not null)
                {
                    return $"age BETWEEN {this.ageFrom} and {this.ageTo}";
                }
                else 
                {
                    return null;
                }
            }
        }


        public string? getPartySQL
        {
            get
            {
                if (party is null)
                {
                    return null;
                }
                else if (party is -1)
                {
                    return "id_party is null";
                }
                else
                {
                    return $"id_party = {this.party}";
                }
            }
        }
    }
}