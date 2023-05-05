namespace ElectionBack.Models
{
    public class CandidateFilter
    {
        public string? filterName { get; set; } = null;
        public string? birthdayFrom { get; set; } = null;
        public string? birthdayTo { get; set; } = null;
        public int? party { get; set; } = -1;

        public CandidateFilter(string? filterName, string? birthdayFrom, string? birthdayTo, int? party)
        {
            this.filterName = filterName;
            this.birthdayFrom = birthdayFrom;
            this.birthdayTo = birthdayTo;
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
                if (getBirthdaySQL is not null)
                {
                    value.Add(getBirthdaySQL);
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
                    return $"full_name LIKE concat(@filterName, '%')";
                }
            }
        }


        public string? getBirthdaySQL
        {
            get
            {
                if (birthdayFrom is null && birthdayTo is null)
                {
                    return null;
                }
                else if (birthdayFrom is null && birthdayTo is not null)
                {
                    return $"birthday <= '{this.birthdayTo}'";
                }
                else if (birthdayFrom is not null && birthdayTo is null)
                {
                    return $"birthday >= '{this.birthdayFrom}'";
                }
                else if (birthdayFrom is not null && birthdayTo is not null)
                {
                    return $"birthday >= '{this.birthdayFrom}' and birthday <= '{this.birthdayTo}'";
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