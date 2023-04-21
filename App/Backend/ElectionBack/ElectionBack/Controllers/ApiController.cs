using Microsoft.AspNetCore.Mvc;
using ElectionBack.Models;
using ElectionBack.Modules;
using ElectionBack.DBModels;
using Microsoft.AspNetCore.Mvc.ModelBinding;


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


        [HttpGet("/candidate/get")]
        [ProducesResponseType(typeof(CandidateTable), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetOneCandidates([BindRequired] int id)
        {
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            return new OkObjectResult(result);
        }


        [HttpDelete("/candidate/delete")]
        public async Task<IActionResult> DeleteOneCandidates([BindRequired] int id)
        {
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            await result.DeleteAsync();
            return new OkResult();
        }


        [HttpPut("/candidate/update")]
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


        [HttpPost("/candidate/add/")]
        [ProducesResponseType(typeof(CandidateTable), StatusCodes.Status200OK)]
        public async Task<IActionResult> addOneCandidates([FromBody] CandidateTable body)
        {
            await DB.Connection.OpenAsync();
            body.DB = DB;
            await body.InsertAsync();
            return new OkObjectResult(body);
        }


        [HttpGet("/candidates/filter")]
        [ProducesResponseType(typeof(List<CandidateTable>), StatusCodes.Status200OK)]
        public async Task<IActionResult> getFilterCandidates([BindRequired] int from, [BindRequired] int to, string? filterName, string? birthdayFrom, string? birthdayTo, int? id_party)
        {
            if (to <= from) return new BadRequestObjectResult(new { message = "To<=From", code = 20 });
            CandidateFilter filter = new(filterName, birthdayFrom, birthdayTo, id_party);
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.filterCandidate(from, to, filter);
            if (result is null) return new BadRequestObjectResult(new { message = "result is null", code = 40 });
            return new OkObjectResult(result);
        }


        [HttpGet("/candidates/countRowIsFilterAndAll")]
        [ProducesResponseType(typeof(Tuple<int,int>), StatusCodes.Status200OK)]
        public async Task<IActionResult> getCountRowElections(string? filterName, string? birthdayFrom, string? birthdayTo, int? id_party)
        {
            await DB.Connection.OpenAsync();
            CandidateFilter filter = new(filterName, birthdayFrom, birthdayTo, id_party);
            var query = new CandidateTableQuery(DB);
            var result = query.getCountFilterCandidates(filter);
            if (result is null) return new BadRequestResult();
            return new OkObjectResult(new { allCount = result.Result.Item1, filterCount = result.Result.Item2 });
        }


        [HttpGet("/election/get")]
        public async Task<IActionResult> GetOneElections([BindRequired] int id)
        {
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.getOne(id);
            if (result is null) return new NotFoundResult();
            return new OkObjectResult(result);
        }


        [HttpDelete("/election/delete")]
        public async Task<IActionResult> DeleteOneElections([BindRequired] int id)
        {
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            await result.DeleteAsync();
            return new OkResult();
        }


        [HttpPut("/election/update")]
        public async Task<IActionResult> updateOneElections([BindRequired] int id, [FromBody] ElectionsTable body)
        {
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            result.Copy(body);
            await result.UpdateAsync();
            return new OkObjectResult(result);
        }


        [HttpPost("/election/add")]
        public async Task<IActionResult> addOneElections([FromBody] ElectionsTable body)
        {
            await DB.Connection.OpenAsync();
            body.DB = DB;
            await body.InsertAsync();
            return new OkObjectResult(body);
        }


        [HttpGet("/elections/filter")]
        public async Task<IActionResult> getFilterElections([BindRequired] int from, [BindRequired] int to, bool? upcoming, int? type, string? dateFrom, string? dateTo, string? nameSearch, string? pleSearch)
        {
            if (!ElectionsFilter.isValidValueForFilter(ref from, ref to, ref upcoming, ref type, ref dateFrom, ref dateTo, ref nameSearch, ref pleSearch, out IActionResult errorObject)) return errorObject;

            ElectionsFilter filter = new(upcoming, type, Tuple.Create(dateFrom, dateTo), nameSearch, pleSearch);
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.filterElections(from, to, filter);
            if (result is null) return new BadRequestObjectResult(new { message = "result is null", code = 40 });
            return new OkObjectResult(result);
        }


        [HttpGet("/elections/countRowIsFilterAndAll")]
        public async Task<IActionResult> getCountRowElections(bool? upcoming, int? type, string? dateFrom, string? dateTo, string? nameSearch, string? pleSearch)
        {
            await DB.Connection.OpenAsync();
            ElectionsFilter filter = new(upcoming, type, Tuple.Create(dateFrom, dateTo), nameSearch, pleSearch);
            var query = new ElectionsTableQuery(DB);
            var result = query.getCountFilterElections(filter);
            if (result is null) return new BadRequestResult();
            return new OkObjectResult(new { allCount = result.Result.Item1, filterCount = result.Result.Item2 });
        }


        [HttpGet("/analytics/getCountCandidatsPartyFromElections")]
        public async Task<IActionResult> getCountCandidatsPartyFromElections([BindRequired] int election_id)
        {
            await DB.Connection.OpenAsync();
            var query = new AnalyticsSelectQuerty(DB);
            var result = query.GetCountCandidatsPartyFromElections(election_id);
            return new OkObjectResult(result.Result);
        }
    }
}