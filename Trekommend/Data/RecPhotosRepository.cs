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
    public class RecPhotosRepository
    {
        readonly string _connectionString;

        public RecPhotosRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Trekommend");
        }

        public List<RecommendationPhoto> GetRecPhotos(int recId)
        {
           return  GetRecPhotos(new[] { recId });
        }
        public List<RecommendationPhoto> GetRecPhotos(IEnumerable<int> recIds)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from Recommendation_Photos where RecId in @recIds";

            var parameters = new { recIds };

            var recPhotos = db.Query<RecommendationPhoto>(sql, parameters);

            return recPhotos.ToList();
        }

        public int AddPhoto(RecommendationPhoto newPhoto)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $@"INSERT INTO [dbo].[Recommendation_Photos]
                               ([RecId]
                               ,[PhotoUrl])
                        Output inserted.PhotoId
                         VALUES
                               (@recId
                               ,@photoUrl)";

            var newId = db.ExecuteScalar<int>(sql, newPhoto);

            newPhoto.PhotoId = newId;
            return newId;
        }
    }
}
