using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Trekommend.Models
{
    public class RecommendationPhoto
    {
        public int PhotoId { get; set; }
        public int RecId { get; set; }
        public string PhotoUrl { get; set; }
    }
}
