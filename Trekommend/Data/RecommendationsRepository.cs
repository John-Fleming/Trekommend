using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using Trekommend.Models;

namespace Trekommend.Data
{
    public class RecommendationsRepository
    {
        const string _connectionString = "Server = localhost; Database = Trekommend; Trusted_Connection = True;";

        public IEnumerable<Recommendation> GetUsersRecommendations(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from recommendations where UserId = @uid";

            var parameters = new { uid = userId };

            var userRecommendations = db.Query<Recommendation>(sql, parameters);

            return userRecommendations;
        }

        public IEnumerable<Recommendation> GetRecsByTrip(int tripId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from recommendations where TripId = @tid";

            var parameters = new { tid = tripId};

            var tripRecommendations = db.Query<Recommendation>(sql, parameters);

            return tripRecommendations;
        }

        public Recommendation GetRec(int recId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from recommendations where RecId = @rid";

            var parameters = new { rid = recId };

            var singleRec = db.QueryFirstOrDefault<Recommendation>(sql, parameters);

            return singleRec;
        }
    }
}
