using Microsoft.AspNetCore.Mvc;
using ElectionBack.Models;
using ElectionBack.Modules;
using ElectionBack.DBModels;
using System.Reflection;

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


        [HttpGet("/candidates/get/{id}")]
        public async Task<IActionResult> GetOneCandidates(int id)
        {
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            return new OkObjectResult(result);
        }


        [HttpDelete("/candidates/delete/{id}")]
        public async Task<IActionResult> DeleteOneCandidates(int id)
        {
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            await result.DeleteAsync();
            return new OkResult();
        }


        [HttpPut("/candidates/update/{id}")]
        public async Task<IActionResult> updateOneCandidates(int id, [FromBody] CandidateTable body)
        {
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            result.Copy(body);
            await result.UpdateAsync();
            return new OkObjectResult(result);
        }


        [HttpPost("/candidates/add/")]
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


        [HttpGet("/candidates/filter/{from}/{to}")]
        public async Task<IActionResult> getFilterCandidates(int from, int to, string? filterName, int? ageFrom, int? ageTo, int? id_party)
        {
            if (to <= from) return new BadRequestObjectResult(new { message = "To<=From", code = 20 });
            CandidateFilter filter = new(filterName, ageFrom, ageTo, id_party);
            await DB.Connection.OpenAsync();
            var query = new CandidateTableQuery(DB);
            var result = await query.filterCandidate(from, to, filter);
            if (result is null) return new BadRequestObjectResult(new { message = "result is null", code = 40 });
            return new OkObjectResult(result);
        }


        [HttpGet("/elections/get/{id}")]
        public async Task<IActionResult> GetOneElections(int id)
        {
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            return new OkObjectResult(result);
        }


        [HttpDelete("/elections/delete/{id}")]
        public async Task<IActionResult> DeleteOneElections(int id)
        {
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            await result.DeleteAsync();
            return new OkResult();
        }


        [HttpPut("/elections/update/{id}")]
        public async Task<IActionResult> updateOneElections(int id, [FromBody] ElectionsTable body)
        {
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.findOne(id);
            if (result is null) return new NotFoundResult();
            result.Copy(body);
            await result.UpdateAsync();
            return new OkObjectResult(result);
        }


        [HttpPost("/elections/add")]
        public async Task<IActionResult> addOneElections([FromBody] ElectionsTable body)
        {
            await DB.Connection.OpenAsync();
            body.DB = DB;
            await body.InsertAsync();
            return new OkObjectResult(body);
        }


        [HttpGet("/elections/filter/{from}/{to}")]
        public async Task<IActionResult> getFilterElections(int from, int to, bool? upcoming, int? type, Tuple<string?, string?> range_date, string? nameSearch, string? pleSearch)
        {
            if (to <= from) return new BadRequestObjectResult(new { message = "To<=From", code = 20 });
            ElectionsFilter filter = new(upcoming, type, range_date, nameSearch, pleSearch);
            await DB.Connection.OpenAsync();
            var query = new ElectionsTableQuery(DB);
            var result = await query.filterElections(from, to, filter);
            if (result is null) return new BadRequestObjectResult(new { message = "result is null", code = 40 });
            return new OkObjectResult(result);
        }
    }
}