using Microsoft.AspNetCore.Mvc;
using ElectionBack.Models;
using ElectionBack.Modules;

namespace ElectionBack.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ElectionBackendController : ControllerBase
    {
        [HttpGet]
        [Route("/candidate/all")]
        public List<Models.Candidate> AllCandidate()
        {
            Modules.DBService db = new Modules.DBService();
            return db.GetAll();
        }
        //[HttpGet]
        //[Route("/getString/{id:int}")]
        //public string GetString(FromRouteAttribute id)
        //{
            // int id_candidate = id;
            // return $"Какая-то строка с {id}";
        //}
    }
}