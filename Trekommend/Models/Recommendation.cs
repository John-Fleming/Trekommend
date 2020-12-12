using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Trekommend.Models
{
    public class Recommendation
    {
        public int RecId { get; set; }
        public int UserId { get; set; }
        public int TripId { get; set; }
        public int RecCategoryId { get; set; }
        public string Title { get; set; }
        public int? Rating { get; set; }
        public string Review { get; set; }
        public string Description { get; set; }
        public int TimesSaved{ get; set; }
        public IEnumerable<RecommendationPhoto> Photos { get; internal set; }
    }
}
