using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Threading.Tasks;
using WorldCities.API.Controllers;
using WorldCities.API.Data.Models;

namespace WorldCiries.Test
{
    public class CitiesController_Tests
    {
        [Fact]
        public async Task GetCity()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                 .UseInMemoryDatabase(databaseName: "WorldCities")
                 .Options;
            using var context = new ApplicationDbContext(options);

            context.Add(new City()
            {
                Id = 1,
                CountryId = 1,
                Lat = 1,
                Lon = 1,
                Name = "TestCity1"
            });
            context.SaveChanges();

            var controller = new CitiesController(context);

            City? city_existing = null;
            City? city_notExisting = null;

            // Act
            city_existing = (await controller.GetCity(1)).Value;
            city_notExisting = (await controller.GetCity(2)).Value;

            // Assert
            Assert.NotNull(city_existing);
            Assert.Null(city_notExisting);

        }
    }
}
