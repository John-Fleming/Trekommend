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
    [Route("api/relationships")]
    [ApiController]
    public class RelationshipsController : ControllerBase
    {
        RelationshipsRepository _repo;

        public RelationshipsController()
        {
            _repo = new RelationshipsRepository();
        }

        [HttpGet("{userId}/followers")]
        public IActionResult GetUserFollowersByUserId(int userId)
        {
            var userFollowers = _repo.GetUserFollowers(userId);
            return Ok(userFollowers);
        }

        [HttpGet("{userId}/following")]
        public IActionResult GetUsersFollowedByUser(int userId)
        {
            var usersBeingFollowed = _repo.GetUsersBeingFollowed(userId);
            return Ok(usersBeingFollowed);
        }

        [HttpPost()]
        public IActionResult FollowAUser(Relationship newFollow)
        {
            var newRelationship = _repo.AddFollower(newFollow);
            return Created($"Now following userId: {newRelationship.UserBeingFollowedId}", newRelationship);
        }

        [HttpDelete("{userId}/unfollow/{followedUserId}")]
        public IActionResult UnfollowAUser(int userId, int followedUserId)
        {
            var singleRelationship = _repo.GetSingleRelationship(userId, followedUserId);

            if (singleRelationship == null) return NotFound();

            _repo.Unfollow(singleRelationship.RelationshipId);

            return Ok();
        }
    }
}
