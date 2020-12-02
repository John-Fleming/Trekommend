using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Trekommend.Models
{
    public class Users
    {
        public int UserId { get; set; }
        public int Uuid { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Password { get; set; }
        public DateTime DateJoined { get; set; }
        public string UserPhoto { get; set; }
    }
}
