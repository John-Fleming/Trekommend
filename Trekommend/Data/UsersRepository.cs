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
    public class UsersRepository
    {
        readonly string _connectionString;

        public UsersRepository(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Trekommend");
        }

        public IEnumerable<User> GetAll()
        {
            using var db = new SqlConnection(_connectionString);
            var sql = $"Select * from users";

            var users = db.Query<User>(sql);

            return users;
        }

        public User GetById(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select * from users
                        where UserId = @uid";

            var parameters = new { uid = userId };

            var singleUser = db.QueryFirstOrDefault<User>(sql, parameters);
            return singleUser;
        }
        
        public User GetByUuid(int firebaseUid)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @"select * from users
                        where Uuid = @uuid";

            var parameters = new { uuid = firebaseUid };

            var singleUser = db.QueryFirstOrDefault<User>(sql, parameters);
            return singleUser;
        }

        public int AddUser(User newUser)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $@"INSERT INTO [dbo].[Users]
                               ([Uuid]
                               ,[FirstName]
                               ,[LastName]
                               ,[Email]
                               ,[Phone]
                               ,[DateJoined]
                               ,[UserPhoto])
                         VALUES
                               (@uuid
                               ,@firstName
                               ,@lastName
                               ,@email
                               ,@phone
                               ,getdate()
                               ,@userPhoto)";

            var newId = db.ExecuteScalar<int>(sql, newUser);

            newUser.UserId = newId;
            return newId;
        }

    }

}
