using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace WorldCities.API.Data.Models
{
    [Index(nameof(Name))]
    [Index(nameof(ISO2))]
    [Index(nameof(ISO3))]
    public class Country
    {
        #region Properties

        /// <summary>
        /// The unique id and primary key for this Country
        /// </summary>
        [Key]
        [Required]
        public int Id { get; set; }

        /// <summary>
        /// Country name (in UTF8 format)
        /// </summary>
        public string Name { get; set; } = null!;

        /// <summary>
        /// Country code 
        /// (in ISO 3166-1 ALPHA-2 format)
        /// </summary>
        [JsonPropertyName("iso2")]
        public string ISO2 { get; set; } = null!;

        /// <summary>
        /// Country code (in ISO 3166-1 ALPHA-3 format)
        /// </summary>
        [JsonPropertyName("iso3")]
        public string ISO3 { get; set; } = null!;

        #endregion


        #region Navigation Properties

        /// <summary>
        /// A collection of Cities belonging to this Country
        /// </summary>
        public ICollection<City>? Cities { get; set; } = null!;

        #endregion
    }
}
