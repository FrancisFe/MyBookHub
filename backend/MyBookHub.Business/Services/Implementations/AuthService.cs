using AutoMapper;
using MyBookHub.Business.DTOs.Auth;
using MyBookHub.Business.DTOs.User;
using MyBookHub.Business.Services.Interfaces;
using MyBookHub.Data.Entities;
using MyBookHub.Data.Enums;
using MyBookHub.Data.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyBookHub.Business.Services.Implementations
{
    public class AuthService : IAuthService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly ILogger<AuthService> _logger;

        public AuthService(
            IUserRepository userRepository,
            IConfiguration configuration,
            IMapper mapper,
            ILogger<AuthService> logger)
        {
            _userRepository = userRepository;
            _configuration = configuration;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task<TokenResponseDto?> LoginAsync(LoginDto request)
        {
            if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
            {
                _logger.LogWarning("Login attempt with empty email or password");
                return null;
            }

            var user = await _userRepository.GetByEmailAsync(request.Email);
            if (user == null)
            {
                _logger.LogWarning("Login attempt for non-existent user: {Email}", request.Email);
                return null;
            }

            var passwordHasher = new PasswordHasher<User>();
            var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, request.Password);

            if (result == PasswordVerificationResult.Failed)
            {
                _logger.LogWarning("Failed login attempt for user: {Email}", request.Email);
                return null;
            }

            if (result == PasswordVerificationResult.SuccessRehashNeeded)
            {
                user.PasswordHash = passwordHasher.HashPassword(user, request.Password);
                user.UpdatedAt = DateTime.UtcNow;
                await _userRepository.UpdateAsync(user);
            }

            _logger.LogInformation("User {Email} logged in successfully", request.Email);
            return CreateToken(user);
        }


        public async Task<UserDto?> RegisterAsync(RegisterDto request)
        {
            if (await _userRepository.EmailExistAsync(request.Email) ||
                await _userRepository.UserNameExistAsync(request.UserName))
            {
                _logger.LogWarning("Registration attempt with existing email or username");
                return null;
            }

            var user = new User
            {
                UserName = request.UserName.Trim(),
                Email = request.Email.Trim().ToLower(),
                PasswordHash = new PasswordHasher<User>().HashPassword(null, request.Password),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };

            await _userRepository.AddAsync(user);
            _logger.LogInformation("User {Email} registered successfully", request.Email);
            return _mapper.Map<UserDto>(user);
        }
        public async Task<UserRole> GetUserRole(int userId)
        {
            return await _userRepository.GetUserRole(userId);
        }

        private TokenResponseDto CreateToken(User user)
        {
            try
            {
                // Validar configuración
                var tokenSecret = _configuration["AppSettings:Token"];
                var issuer = _configuration["AppSettings:Issuer"];
                var audience = _configuration["AppSettings:Audience"];

                if (string.IsNullOrEmpty(tokenSecret))
                {
                    _logger.LogError("AppSettings:Token is not configured");
                    throw new InvalidOperationException("Token secret is not configured");
                }

                if (tokenSecret.Length < 64)
                {
                    _logger.LogError("AppSettings:Token is too short. Required: 64+ characters, Current: {Length}", tokenSecret.Length);
                    throw new InvalidOperationException($"Token secret must be at least 64 characters for HmacSha512. Current length: {tokenSecret.Length}");
                }

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role.ToString()),
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenSecret));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

                var tokenDescriptor = new JwtSecurityToken(
                    issuer: issuer,
                    audience: audience,
                    claims: claims,
                    expires: DateTime.UtcNow.AddDays(1),
                    signingCredentials: creds);

                var token = new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);

                _logger.LogInformation("Token created successfully for user {UserId}", user.Id);
                _logger.LogDebug("Token claims: {Claims}", string.Join(", ", claims.Select(c => $"{c.Type}={c.Value}")));

                return new TokenResponseDto
                {
                    Token = token,
                    ExpiresIn = tokenDescriptor.ValidTo
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating token for user {UserId}", user.Id);
                throw;
            }
        }


    }
}
