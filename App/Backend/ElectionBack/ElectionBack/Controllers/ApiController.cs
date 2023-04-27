using Microsoft.AspNetCore.Mvc;
using ElectionBack.Models;
using ElectionBack.Modules;
using ElectionBack.DBModels;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Reflection.Emit;


namespace ElectionBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EndpointsBackendController : ControllerBase
    {
        public DBConnect DB { get; }

        public EndpointsBackendController(DBConnect _db)
        {
            DB = _db;
        }



        [HttpGet("/candidate/")]
        [ProducesResponseType(typeof(CandidateTable), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetOneCandidates([BindRequired] int id)
        {
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            return new OkObjectResult(result);
        }


        [HttpDelete("/candidate")]
        public async Task<IActionResult> DeleteOneCandidates([BindRequired] int id)
        {
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            await result.DeleteAsync();
            return new OkResult();
        }


        [HttpPut("/candidate")]
        [ProducesResponseType(typeof(CandidateTable), StatusCodes.Status200OK)]
        public async Task<IActionResult> updateOneCandidates([BindRequired] int id, [FromBody] CandidateTable body)
        {
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            result.Copy(body);
            await result.UpdateAsync();
            return new OkObjectResult(result);
        }


        [HttpPost("/candidate")]
        [ProducesResponseType(typeof(CandidateTable), StatusCodes.Status200OK)]
        public async Task<IActionResult> addOneCandidates([FromBody] CandidateTable body)
        {
            await DB.Connection.OpenAsync();
            body.DB = DB;
            await body.InsertAsync();
            return new OkObjectResult(body);
        }


        [HttpGet("/candidates")]
        public async Task<IActionResult> getFilterCandidates([BindRequired] int page, string? filterName, string? birthdayFrom, string? birthdayTo, int? id_party)
        {
            CandidateFilter filter = new(filterName, birthdayFrom, birthdayTo, id_party);
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.filterCandidate(page, filter);
            var counts = await query.getCountFilterCandidates(filter);
            if (result is null) return new BadRequestObjectResult(new { message = "result is null", code = 40 });
            if (counts is null) return new BadRequestResult();
            return new OkObjectResult(new { candidates = result, counts = new { allCount = counts.Item1, filterCount = counts.Item2 } });
        }


        /*[HttpGet("/candidates/countRowIsFilterAndAll")]
        [ProducesResponseType(typeof(Tuple<int,int>), StatusCodes.Status200OK)]
        public async Task<IActionResult> getCountRowElections(string? filterName, string? birthdayFrom, string? birthdayTo, int? id_party)
        {
            await DB.Connection.OpenAsync();
            CandidateFilter filter = new(filterName, birthdayFrom, birthdayTo, id_party);
            var query = new CandidateTableQuery(DB);
            var result = query.getCountFilterCandidates(filter);
            if (result is null) return new BadRequestResult();
            return new OkObjectResult(new { allCount = result.Result.Item1, filterCount = result.Result.Item2 });
        }*/


        [HttpGet("/election")]
        [ProducesResponseType(typeof(ElectionsTable), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetOneElections([BindRequired] int id)
        {
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            return new OkObjectResult(result);
        }


        [HttpDelete("/election")]
        public async Task<IActionResult> DeleteOneElections([BindRequired] int id)
        {
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            await result.DeleteAsync();
            return new OkResult();
        }


        [HttpPut("/election")]
        [ProducesResponseType(typeof(ElectionsTable), StatusCodes.Status200OK)]
        public async Task<IActionResult> updateOneElections([BindRequired] int id, [FromBody] ElectionsTable body)
        {
            if (body.number_of_deputy_mandates < 0) return new BadRequestObjectResult(new { message = " оличество монадтов не сожет быть меньше нул€." });
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            result.Copy(body);
            await result.UpdateAsync();
            return new OkObjectResult(result);
        }


        [HttpPost("/election")]
        [ProducesResponseType(typeof(ElectionsTable), StatusCodes.Status200OK)]
        public async Task<IActionResult> addOneElections([FromBody] ElectionsTable body)
        {
            await DB.Connection.OpenAsync();
            body.DB = DB;
            await body.InsertAsync();
            return new OkObjectResult(body);
        }


        [HttpGet("/elections")]
        public async Task<IActionResult> getFilterElections([BindRequired] int page, bool? upcoming, int? type, string? dateFrom, string? dateTo, string? nameSearch, string? pleSearch)
        {
            if (!ElectionsFilter.isValidValueForFilter(ref upcoming, ref type, ref dateFrom, ref dateTo, ref nameSearch, ref pleSearch, out IActionResult errorObject)) return errorObject;

            ElectionsFilter filter = new(upcoming, type, Tuple.Create(dateFrom, dateTo), nameSearch, pleSearch);
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.filterElections(page, filter);
            var counts = await query.getCountFilterElections(filter);
            if (result is null) return new BadRequestObjectResult(new { message = "result is null", code = 40 });
            if (counts is null) return new BadRequestResult();
            return new OkObjectResult(new { elections = result, counts = new { allCount = counts.Item1, filterCount = counts.Item2 } });
        }


        /*[HttpGet("/elections/countRowIsFilterAndAll")]
        public async Task<IActionResult> getCountRowElections(bool? upcoming, int? type, string? dateFrom, string? dateTo, string? nameSearch, string? pleSearch)
        {
            await DB.Connection.OpenAsync();
            ElectionsFilter filter = new(upcoming, type, Tuple.Create(dateFrom, dateTo), nameSearch, pleSearch);
            var query = new ElectionsTableQuery(DB);
            var result = query.getCountFilterElections(filter);
            if (result is null) return new BadRequestResult();
            return new OkObjectResult(new { allCount = result.Result.Item1, filterCount = result.Result.Item2 });
        }*/


        [HttpGet("/elections/getPleDictionary")]
        public async Task<IActionResult> getPleDictionary()
        {
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.GetPleDictionary();
            var list = new List<Dictionary<string, string>>();
            foreach (var element in result)
            {
                list.Add(new Dictionary<string, string> { { "label", element.Key }, { "value", element.Value.ToString() } });
            }
            return new OkObjectResult(list);
        }

        /*[HttpGet("/elections/getPleName")]
        public async Task<IActionResult> getPleId([BindRequired] int pleId)
        {
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = query.GetPleName(pleId);
            if (result.Result is null) return new BadRequestResult();
            return new OkObjectResult(result.Result);
        }*/



        [HttpGet("/analytics/getCountCandidatsPartyFromElections")]
        public async Task<IActionResult> getCountCandidatsPartyFromElections([BindRequired] int election_id)
        {
            await DB.Connection.OpenAsync();
            var query = new AnalyticsSelectQuerty(DB);
            var result = query.GetCountCandidatsPartyFromElections(election_id);
            if (result.Result.Count == 0) return new BadRequestObjectResult(new { message = "election_id invalid", code = 10 });
            return new OkObjectResult(result.Result);
        }


        [HttpGet("/analitics/getGroupAgeInParty")]
        public async Task<IActionResult> getGroupAgeInParty([BindRequired] int party_id)
        {
            await DB.Connection.OpenAsync();
            var query = new AnalyticsSelectQuerty(DB);
            var result = query.GetGroupAgeInParty(party_id);
            if (result.Result.Sum(x => x.Value) == 0) return new BadRequestObjectResult(new { message = "party_id invalid", code = 10 });
            return new OkObjectResult(result.Result);
        }
    }
}