using BibliotecaDevlights.Data.Enums;

namespace BibliotecaDevlights.Business.DTOs.User
{
    public class UserDto
    {
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string? Img { get; set; }
        public UserRole Role { get; set; }
    }
}
