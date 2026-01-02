using MyBookHub.Data.Entities;
using MyBookHub.Data.Enums;

namespace MyBookHub.Data.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> EmailExistAsync(string email);

        Task<bool> UserNameExistAsync(string userName);
        Task<User> AddAsync(User user);
        Task<User> UpdateAsync(User user);
        Task<User?> GetByEmailAsync(string email);
        Task<UserRole> GetUserRole(int userId);
    }
}
