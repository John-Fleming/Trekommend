using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using Trekommend.Models;
using Microsoft.Extensions.Configuration;

namespace Trekommend.Data
{
    public class RecommendationsRepository
    {
        readonly string _connectionString;

        public RecommendationsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Trekommend");
        }

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

        public int AddRec(Recommendation newRec)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $@"INSERT INTO [dbo].[Recommendations]
                               ([UserId]
                               ,[TripId]
                               ,[RecCategoryId]
                               ,[Title]
                               ,[Rating]
                               ,[Review]
                               ,[Description]
                               ,[TimesSaved])
                         Output inserted.RecId
                         VALUES
                               (@userId
                               ,@tripId
                               ,@recCategoryId
                               ,@title
                               ,@rating
                               ,@review
                               ,@description
                               ,@timesSaved)";

            var newId = db.ExecuteScalar<int>(sql, newRec);

            newRec.RecId= newId;
            return newId;
        }
    }
}
