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
    public class UserLanguage : IMongoCommon
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; }
        //[Required]
        //[StringLength(100)]
        public string Language { get; set; }
        ////[Required]
        //[StringLength(100)]
        public string LanguageLevel { get; set; }
        public bool IsDeleted { get; set; }
    }
}
