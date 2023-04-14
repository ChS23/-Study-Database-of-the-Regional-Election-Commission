using Microsoft.AspNetCore.Mvc;
using ElectionBack.Models;
using ElectionBack.Modules;
using ElectionBack.DBModels;
using System.Reflection;
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


        /*[HttpGet("/candidates/all")]
        public async Task<IActionResult> GetAllCandidates()
        {
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.findAll();
            return new OkObjectResult(result);
        }
        */


        [HttpGet("/candidate/get")]
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
        public async Task<IActionResult> addOneCandidates([FromBody] CandidateTable body)
        {
            await DB.Connection.OpenAsync();
            body.DB = DB;
            await body.InsertAsync();
            return new OkObjectResult(body);
        }


        /*[HttpGet("/candidates/get/{from}/{to}")]
        public async Task<IActionResult> getFromToCandidates(int from, int to)
        {
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.findFromTo(to - from, from);
            if (result is null) return new NotFoundResult();
            return new OkObjectResult(result);
        }*/


        [HttpGet("/candidates/filter")]
        public async Task<IActionResult> getFilterCandidates([BindRequired] int from, [BindRequired] int to, string? filterName, int? ageFrom, int? ageTo, int? id_party)
        {
            if (to <= from) return new BadRequestObjectResult(new { message = "To<=From", code = 20 });
            CandidateFilter filter = new(filterName, ageFrom, ageTo, id_party);
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.filterCandidate(from, to, filter);
            if (result is null) return new BadRequestObjectResult(new { message = "result is null", code = 40 });
            return new OkObjectResult(result);
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
            if (to <= from) return new BadRequestObjectResult(new { message = "To<=From", code = 20 });
            if (type is not null and not (1 or 2)) return new BadRequestObjectResult(new { message = "type принимает значение: [null, 1, 2]", code = 30 });
            ElectionsFilter filter = new(upcoming, type, Tuple.Create(dateFrom, dateTo), nameSearch, pleSearch);
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.filterElections(from, to, filter);
            if (result is null) return new BadRequestObjectResult(new { message = "result is null", code = 40 });
            return new OkObjectResult(result);
        }
    }
}