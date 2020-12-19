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
    public class TripsRepository
    {
        readonly string _connectionString;

        public TripsRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Trekommend");
        }

        public IEnumerable<Trip> GetUsersTrips(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from Trips where UserId = @uid Order By Name";

            var parameters = new { uid = userId };

            var usersTrips = db.Query<Trip>(sql, parameters);

            return usersTrips;
        }
        
        public Trip GetTrip(int tripId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from trips where TripId = @tid";

            var parameters = new { tid = tripId };

            var singleTrip = db.QueryFirstOrDefault<Trip>(sql, parameters);

            return singleTrip;
        }

        public int AddTrip(Trip newTrip)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $@"INSERT INTO [dbo].[Trips]
                               ([UserId]
                               ,[Name]
                               ,[Location]
                               ,[StartDate]
                               ,[EndDate]
                               ,[CoverPhoto]
                               ,[IsPlanned])
                        Output inserted.TripId
                         VALUES
                               (@userId
                               ,@name
                               ,@location
                               ,@startDate
                               ,@endDate
                               ,@coverPhoto
                               ,@isPlanned)";

            var newId = db.ExecuteScalar<int>(sql, newTrip);

            newTrip.TripId = newId;
            return newId;
        }
    }
}
