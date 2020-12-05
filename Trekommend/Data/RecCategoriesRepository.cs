using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using Trekommend.Models;

namespace Trekommend.Data
{
    public class RecCategoriesRepository
    {
        const string _connectionString = "Server = localhost; Database = Trekommend; Trusted_Connection = True;";

        public IEnumerable<RecommendationCategory> GetAllCategories()
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from Recommendation_Categories";

            var categories = db.Query<RecommendationCategory>(sql);

            return categories;
        }

        public RecommendationCategory GetSingleRecCategory(int categoryId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from Recommendation_Categories where RecCategoryId = @cid";

            var parameters = new { cid = categoryId };

            var category = db.QueryFirstOrDefault<RecommendationCategory>(sql, parameters);

            return category;
        }
    }
}
