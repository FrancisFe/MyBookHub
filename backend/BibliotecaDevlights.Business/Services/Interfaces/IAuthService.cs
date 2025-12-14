using BibliotecaDevlights.Business.DTOs.Auth;
using BibliotecaDevlights.Business.DTOs.User;
using BibliotecaDevlights.Data.Enums;

namespace BibliotecaDevlights.Business.Services.Interfaces
{
    public interface IAuthService
    {
        Task<UserDto?> RegisterAsync(RegisterDto request);
        Task<TokenResponseDto?> LoginAsync(LoginDto request);
        Task<UserRole> GetUserRole(int userId);
    }
}
