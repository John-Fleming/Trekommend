using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using Trekommend.Models;

namespace Trekommend.Data
{
    public class RecPhotosRepository
    {
        const string _connectionString = "Server = localhost; Database = Trekommend; Trusted_Connection = True;";

        public List<RecommendationPhoto> GetRecPhotos(int recId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from Recommendation_Photos where RecId = @rid";

            var parameters = new { rid = recId };

            var recPhotos = db.Query<RecommendationPhoto>(sql, parameters);

            return recPhotos.ToList();
        }
    }
}
