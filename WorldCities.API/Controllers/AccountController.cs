using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using NuGet.Protocol.Plugins;
using System.IdentityModel.Tokens.Jwt;
using WorldCities.API.Data.DTOs;
using WorldCities.API.Data.Models;
using WorldCities.API.Services;

namespace WorldCities.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtHandler _jwtHandler;

        public AccountController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            JwtHandler jwtHandler
        )
        {
            _context = context;
            _userManager = userManager;
            _jwtHandler = jwtHandler;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDTO loginRequest)
        {
            var user = await _userManager.FindByEmailAsync(loginRequest.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginRequest.Password))

                return Unauthorized(
                    new LoginResultDTO() { Success = false, Message = "Invalid Email or Password." }
                );

            var secToken = await _jwtHandler.GetTokenAsync(user);
            var jwt = new JwtSecurityTokenHandler().WriteToken(secToken);

            return Ok(
                new LoginResultDTO()
                {
                    Success = true,
                    Message = "Login successful",
                    Token = jwt
                }
            );
        }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDTO registerRequest)
        {
            var user = new ApplicationUser()
            {
                UserName = registerRequest.UserName,
                Email = registerRequest.Email,
                PhoneNumber = registerRequest.PhoneNumber,
                SecurityStamp = Guid.NewGuid().ToString()
            };

            var result = await _userManager.CreateAsync(user, registerRequest.Password);

            if (!result.Succeeded)
            {
                var errors = result.Errors.Select(e => e.Description);

                return BadRequest(new RegisterResultsDTO() { Success = false, Errors = errors });
            }

            await _userManager.AddToRoleAsync(user, "RegisteredUser");

            return StatusCode(201, new RegisterResultsDTO { Success = true });
        }
    }
}
