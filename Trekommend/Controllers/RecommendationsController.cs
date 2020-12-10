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
        RecPhotosRepository _photosRepo;

        public RecommendationsController()
        {
            _repo = new RecommendationsRepository();
            _photosRepo = new RecPhotosRepository();
        }

        [HttpGet("{userId}")]
        public IActionResult GetRecommendationsByUserId(int userId)
        {
            var usersRecs = _repo.GetUsersRecommendations(userId);

            // take the recs, loop over them, grab each recId, call the photosRepo GetRecPhotos method, return a new object with the colleciton of photos on it too

            
            var test = usersRecs.ToList().First();
            Type whatIsIt = test.GetType();
            //usersRecs.ToList().ForEach(rec => rec.recPhotos = _photosRepo.GetRecPhotos(rec.RecId));

            // I need to figure out how to get add those photos as a property on the rec model

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
