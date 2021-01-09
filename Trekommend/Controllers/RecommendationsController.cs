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
        RelationshipsRepository _relationshipsRepo;

        public RecommendationsController(RecommendationsRepository repo, RecPhotosRepository photosrepo, RelationshipsRepository relationshipsrepo)
        {
            _repo = repo;
            _photosRepo = photosrepo;
            _relationshipsRepo = relationshipsrepo;
        }

        [HttpGet("{userId}")]
        public IActionResult GetRecommendationsByUserId(int userId)
        {
            var usersRecs = _repo.GetUsersRecommendations(userId);

            var photos = _photosRepo.GetRecPhotos(usersRecs.Select(r => r.RecId));

            foreach (var rec in usersRecs)
            {
                rec.Photos = photos.Where(p => p.RecId == rec.RecId);
            }

            return Ok(usersRecs);
        }

        [HttpGet("{userId}/followingRecs")]
        public IActionResult GetAllUserFollowingRecommendationsByUserId(int userId)
        {
            var usersFollowingIds = _relationshipsRepo.GetUsersBeingFollowed(userId).Select(user => user.UserId);

            var recs = _repo.GetMultipleUsersRecommendations(usersFollowingIds);

            var photos = _photosRepo.GetRecPhotos(recs.Select(r => r.RecId));

            foreach (var rec in recs)
            {
                rec.Photos = photos.Where(p => p.RecId == rec.RecId);
            }

            return Ok(recs);
        }

        [HttpGet("trip/{tripId}")]
        public IActionResult GetRecommendationsByTripId(int tripId)
        {
            var singleTripRecs = _repo.GetRecsByTrip(tripId);

            var photos = _photosRepo.GetRecPhotos(singleTripRecs.Select(r => r.RecId));

            foreach (var rec in singleTripRecs)
            {
                rec.Photos = photos.Where(p => p.RecId == rec.RecId);
            }

            return Ok(singleTripRecs);
        }
        
        [HttpGet("singleRec/{recId}")]
        public IActionResult GetSingleRecommendation(int recId)
        {
            var singleRec = _repo.GetRec(recId);

            var photos = _photosRepo.GetRecPhotos(singleRec.RecId);

            singleRec.Photos = photos;

            return Ok(singleRec);
        }

        [HttpPost]
        public IActionResult AddNewRec(Recommendation newRec)
        {
            var recId = _repo.AddRec(newRec);

            return Created($"/api/recommendations/{newRec.RecId}", newRec);
        }
    }
}
