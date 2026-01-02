using MyBookHub.Business.DTOs.Auth;
using MyBookHub.Business.DTOs.User;
using MyBookHub.Data.Enums;

namespace MyBookHub.Business.Services.Interfaces
{
    public interface IAuthService
    {
        Task<UserDto?> RegisterAsync(RegisterDto request);
        Task<TokenResponseDto?> LoginAsync(LoginDto request);
        Task<UserRole> GetUserRole(int userId);
    }
}
