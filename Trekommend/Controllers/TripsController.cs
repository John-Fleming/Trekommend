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

        public TripsController()
        {
            _repo = new TripsRepository();
        }

        [HttpGet("{userId}")]
        public IActionResult GetTripsByUserId(int userId)
        {
            var usersTrips = _repo.GetUsersTrips(userId);
            return Ok(usersTrips);
        }
        
        [HttpGet("singleTrip/{tripId}")]
        public IActionResult GetSingleTrip(int tripId)
        {
            var singleTrip = _repo.GetTrip(tripId);
            return Ok(singleTrip);
        }
    }
}
