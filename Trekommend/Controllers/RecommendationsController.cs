using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Trekommend.Data;
using Trekommend.Models;

namespace Trekommend.Controllers
{
    [Route("api/recommendations")]
    [ApiController]
    public class RecommendationsController : ControllerBase
    {
        RecommendationsRepository _repo;

        public RecommendationsController()
        {
            _repo = new RecommendationsRepository();
        }

        [HttpGet("{userId}")]
        public IActionResult GetRecommendationsByUserId(int userId)
        {
            var usersRecs = _repo.GetUsersRecommendations(userId);
            return Ok(usersRecs);
        }

        [HttpGet("trip/{tripId}")]
        public IActionResult GetRecommendationsByTripId(int tripId)
        {
            var singleTripRecs = _repo.GetRecsByTrip(tripId);
            return Ok(singleTripRecs);
        }
        
        [HttpGet("singleRec/{recId}")]
        public IActionResult GetSingleRecommendation(int recId)
        {
            var singleRec = _repo.GetRec(recId);
            return Ok(singleRec);
        }
    }
}
