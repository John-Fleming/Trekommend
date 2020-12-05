using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Trekommend.Models
{
    public class Relationship
    {
        public int RelationshipId { get; set; }
        public int UserBeingFollowedId { get; set; }
        public int UserFollowingId { get; set; }
    }
}
