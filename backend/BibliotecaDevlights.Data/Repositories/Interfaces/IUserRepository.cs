using BibliotecaDevlights.Data.Entities;

namespace BibliotecaDevlights.Data.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> EmailExistAsync(string email);

        Task<bool> UserNameExistAsync(string userName);
        Task<User> AddAsync(User user);
        Task<User> UpdateAsync(User user);
        Task<User?> GetByEmailAsync(string email);
    }
}
