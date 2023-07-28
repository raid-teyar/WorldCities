using System.ComponentModel.DataAnnotations;

namespace WorldCities.API.Data.DTOs
{
    public class LoginDTO
    {
        [Required(ErrorMessage = "email is required.")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "password is required.")]
        public string Password { get; set; } = null!;
    }
}
