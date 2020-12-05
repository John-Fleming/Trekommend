using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Trekommend.Models
{
    public class Trip
    {
        public int TripId { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string CoverPhoto { get; set; }
        public bool IsPlanned { get; set; }
    }
}
