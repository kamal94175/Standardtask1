using Talent.Common.Contracts;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Talent.Common.Models
{
    [BsonIgnoreExtraElements]
    public class UserSkill : IMongoCommon
    {
        public bool IsDeleted { get; set; }
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }
        [Required]
        public string Skill { get; set; }
        [Required]
        public string ExperienceLevel { get; set; }
    }
}
