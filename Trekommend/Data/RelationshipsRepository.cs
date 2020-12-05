using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Data.SqlClient;
using Dapper;
using Trekommend.Models;

namespace Trekommend.Data
{
    public class RelationshipsRepository
    {
        const string _connectionString = "Server = localhost; Database = Trekommend; Trusted_Connection = True;";

        public IEnumerable<User> GetUserFollowers(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @$"select u.*
                        from Relationships r
	                        join Users u
	                        on r.UserFollowingId = u.UserId
                        where r.UserBeingFollowedId = @Id;";

            var parameters = new { Id = userId };

            var userFollowers = db.Query<User>(sql, parameters);

            return userFollowers;
        }

        public IEnumerable<User> GetUsersBeingFollowed(int userId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @$"select u.*
                        from Relationships r
	                        join Users u
	                        on r.UserBeingFollowedId = u.UserId
                        where r.UserFollowingId = @Id;";

            var parameters = new { Id = userId };

            var usersBeingFollowed = db.Query<User>(sql, parameters);

            return usersBeingFollowed;
        }

        public Relationship AddFollower(Relationship newFollow)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = @$"INSERT INTO [dbo].[Relationships]
                               ([UserBeingFollowedId]
                               ,[UserFollowingId])
                         OUTPUT inserted.RelationshipId
                         VALUES
                               (@UserBeingFollowedId,@UserFollowingId)";

            var newId = db.ExecuteScalar<int>(sql, newFollow);

            newFollow.RelationshipId = newId;

            return newFollow;
        }

        public Relationship GetSingleRelationship(int userId, int followedUserId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"select * from Relationships where UserFollowingId = @uid and UserBeingFollowedId = @followedUid";

            var parameters = new { uid = userId, followedUid = followedUserId };

            var singleRelationship = db.QueryFirstOrDefault<Relationship>(sql, parameters);

            return singleRelationship;
        }

        public void Unfollow(int relationshipId)
        {
            using var db = new SqlConnection(_connectionString);

            var sql = $"delete from dbo.Relationships where RelationshipId = @rid;";

            db.Execute(sql, new { rid = relationshipId });
        }
    }
}
