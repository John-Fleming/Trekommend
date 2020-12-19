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
    [Route("api/users")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        UsersRepository _repo;

        public UsersController(UsersRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var allUsers = _repo.GetAll();
            return Ok(allUsers);
        }

        [HttpGet("{userId}")]
        public IActionResult GetUserById(int userId)
        {
            var singleUser = _repo.GetById(userId);
            if (singleUser == null) return NotFound("No user with that ID was found");

            return Ok(singleUser);
        }
        
        [HttpGet("fb/{firebaseUid}")]
        public IActionResult GetUserByUuid(int firebaseUid)
        {
            var singleUser = _repo.GetByUuid(firebaseUid);
            if (singleUser == null) return NotFound("No user with that ID was found");

            return Ok(singleUser);
        }

        [HttpPost]
        public IActionResult AddNewUser(User user)
        {
            _repo.AddUser(user);
            return Created($"/api/users/{user.UserId}", user);
        }
    }
}
