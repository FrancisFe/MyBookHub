using MyBookHub.Data.Data;
using MyBookHub.Data.Entities;
using MyBookHub.Data.Enums;
using MyBookHub.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MyBookHub.Data.Repositories.Implementations
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User> AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<User> UpdateAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            return user;
        }
        public async Task<bool> UserNameExistAsync(string userName)
        {
            return await _context.Users.AnyAsync(u => u.UserName == userName);
        }
        public async Task<bool> EmailExistAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<UserRole> GetUserRole(int userId)
        {
            return await _context.Users
                .Where(u => u.Id == userId)
                .Select(u => u.Role)
                .FirstOrDefaultAsync();
        }
    }
}
