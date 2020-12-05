using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using Trekommend.Models;

namespace Trekommend.Data
{
    public class TripsRepository
    {
        const string _connectionString = "Server = localhost; Database = Trekommend; Trusted_Connection = True;";

        public IEnumerable<Trip> GetUsersTrips(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from trips where UserId = @uid";

            var parameters = new { uid = userId };

            var usersTrips = db.Query<Trip>(sql, parameters);

            return usersTrips;
        }
        
        public IEnumerable<Trip> GetTrip(int tripId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from trips where TripId = @tid";

            var parameters = new { tid = tripId };

            var singleTrip = db.Query<Trip>(sql, parameters);

            return singleTrip;
        }
    }
}
