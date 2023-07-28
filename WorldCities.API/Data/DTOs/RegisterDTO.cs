using System.ComponentModel.DataAnnotations;

namespace WorldCities.API.Data.DTOs
{
    public class RegisterDTO
    {
        [Required(ErrorMessage = "username is required.")]
        public string UserName { get; set; } = null!;

        [Required(ErrorMessage = "phone number is required.")]
        public string PhoneNumber { get; set; } = null!;

        [Required(ErrorMessage = "email is required.")]
        public string Email { get; set; } = null!;

        [Required(ErrorMessage = "password is required.")]
        public string Password { get; set; } = null!;
    }
}
