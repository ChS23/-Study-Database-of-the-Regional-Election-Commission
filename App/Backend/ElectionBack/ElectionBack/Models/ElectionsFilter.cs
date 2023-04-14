namespace ElectionBack.Models
{
    public class ElectionsFilter
    {
        public bool? upcoming { get; set; } = null;
        public int? type { get; set; } = null;
        public Tuple<string?, string?> range_date { get; set; }
        public string? nameSearch { get; set; } = null;
        public string? pleSearch { get; set; } = null;


        public ElectionsFilter(bool? upcoming, int? type, Tuple<string?, string?> range_date, string? nameSearch, string? pleSearch)
        {
            this.upcoming = upcoming;
            this.type = type;
            this.range_date = range_date;
            this.nameSearch = nameSearch;
            this.pleSearch = pleSearch;
        }


        public string queryString
        {
            get
            {
                string query = "with t as (SELECT e.election_id, e.name_of_the_election, e.election_date, e.number_of_deputy_mandates, ple.title from elections e join public_legal_entities ple on e.id_public_legal_entitie = ple.public_legal_entitie_id) select * from t ";
                return query + getWhereQuery;
            }
        }


        public string? getWhereQuery
        {
            get
            {
                string? query = "";
                List<string> value = new List<string>();
                if (getUpcoming is not null)
                {
                    value.Add(getUpcoming);
                }
                if (getType is not null)
                {
                    value.Add(getType);
                }
                if (getRangeDate is not null)
                {
                    value.Add(getRangeDate);
                }
                if (getNameSearch is not null)
                {
                    value.Add(getNameSearch);
                }
                if (getPLESearch is not null)
                {
                    value.Add(getPLESearch);
                }
                if (value.Count > 0)
                {
                    query += String.Join(" and ", value);
                }
                if (!String.IsNullOrEmpty(query))
                {
                    return "where" + query;
                }
                else
                {
                    return null;
                }
            }
        }


        public string? getUpcoming
        {
            get
            {
                if (upcoming is true)
                {
                    return $"election_date >= curdate()";
                }
                else
                {
                    return null;
                }
            }
        }


        public string? getType
        {
            get
            {
                if (type == 1)
                {
                    return $"number_of_deputy_mandates=0";
                }
                else if (type == 2)
                {
                    return $"number_of_deputy_mandates>0";
                }
                else
                {
                    return null;
                }
            }
        }


        public string? getRangeDate
        {
            get
            {
                if (range_date.Item1 is not null && range_date.Item2 is null)
                {
                    return $"election_date >= {range_date.Item1}";
                }
                else if (range_date.Item1 is null && range_date.Item2 is not null)
                {
                    return $"election_date <= {range_date.Item2}";
                }
                else if (range_date.Item1 is not null && range_date.Item2 is not null)
                {
                    return $"election_date >= {range_date.Item1} and election_date <= {range_date.Item2}";
                }
                else
                {
                    return null;
                }
            }
        }


        public string? getNameSearch
        {
            get
            {
                if (nameSearch is not null)
                {
                    return $"name_of_the_election like '{nameSearch}%'";
                }
                else
                {
                    return null;
                }
            }
        }


        public string? getPLESearch
        {
            get
            {
                if (pleSearch is not null)
                {
                    return $"title like '{pleSearch}%'";
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
