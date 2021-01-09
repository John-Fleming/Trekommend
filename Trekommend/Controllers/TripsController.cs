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
    [Route("api/trips")]
    [ApiController]
    public class TripsController : ControllerBase
    {
        TripsRepository _repo;
        RelationshipsRepository _relationshipsRepo;
        UsersRepository _usersrepo;

        public TripsController(TripsRepository repo, RelationshipsRepository relationshipsrepo, UsersRepository usersrepo)
        {
            _repo = repo;
            _relationshipsRepo = relationshipsrepo;
            _usersrepo = usersrepo;
        }

        [HttpGet("{userId}")]
        public IActionResult GetTripsByUserId(int userId)
        {
            var usersTrips = _repo.GetUsersTrips(userId);
            return Ok(usersTrips);
        }

        [HttpGet("{userId}/followingTrips")]
        public IActionResult GetAllUserFollowingTripsByUserId(int userId)
        {
            var usersFollowingIds = _relationshipsRepo.GetUsersBeingFollowed(userId).Select(user => user.UserId);

            var trips = _repo.GetMultipleUsersTrips(usersFollowingIds);

            foreach (var trip in trips)
            {
                trip.User = _usersrepo.GetById(trip.UserId);
            }

            return Ok(trips);
        }

        [HttpGet("singleTrip/{tripId}")]
        public IActionResult GetSingleTrip(int tripId)
        {
            var singleTrip = _repo.GetTrip(tripId);
            return Ok(singleTrip);
        }

        [HttpPost]
        public IActionResult AddNewTrip(Trip newTrip)
        {
            _repo.AddTrip(newTrip);

            return Created($"/api/trips/{newTrip.TripId}", newTrip);
        }
    }
}
