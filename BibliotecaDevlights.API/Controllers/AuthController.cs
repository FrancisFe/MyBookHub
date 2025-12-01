using BibliotecaDevlights.Business.DTOs.Auth;
using BibliotecaDevlights.Business.Services.Interfaces;
using BibliotecaDevlights.Data.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaDevlights.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("register")]
        public async Task<ActionResult<User?>> Register(RegisterDto request)
        {
            var user = await _authService.RegisterAsync(request);
            if (user == null)
            {
                return BadRequest("Email already exists");
            }
            return Ok(user);
        }
        [HttpPost("login")]
        public async Task<ActionResult<string?>> Login(LoginDto request)
        {
            var token = await _authService.LoginAsync(request);
            if (token == null)
            {
                return BadRequest("Invalid username or password");
            }
            return Ok(token);
        }


    }
}
