using BibliotecaDevlights.Data.Data;
using BibliotecaDevlights.Data.Entities;
using BibliotecaDevlights.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaDevlights.Data.Repositories.Implementations
{
    public class AuthorRepository : IAuthorRepository
    {
        private readonly AppDbContext _context;
        public AuthorRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Author>> GetAllAsync()
        {
            return await _context.Authors.AsNoTracking().ToListAsync();
        }
        public Task<Author?> GetByIdAsync(int id)
        {
            return _context.Authors.FirstOrDefaultAsync(a => a.Id == id);
        }

        public async Task AddAsync(Author newAuthor)
        {
            await _context.Authors.AddAsync(newAuthor);
            await _context.SaveChangesAsync();

        }
        public async Task<Author?> UpdateAsync(int id, Author updateAuthor)
        {
            if (updateAuthor == null)
            {
                return null;
            }
            var authorExisting = await GetByIdAsync(id);
            if (authorExisting == null)
            {
                return null;
            }
            authorExisting.FirstName = updateAuthor.FirstName;
            authorExisting.LastName = updateAuthor.LastName;
            authorExisting.Biography = updateAuthor.Biography;
            await _context.SaveChangesAsync();

            return authorExisting;

        }

        public async Task<bool> DeleteAsync(int id)
        {
            var author = await GetByIdAsync(id);
            if (author == null)
            {
                return false;
            }
            _context.Authors.Remove(author);
            await _context.SaveChangesAsync();
            return true;

        }

        public async Task<bool> HasAssociatedBooksAsync(int authorId)
        {
            return await _context.Books.AnyAsync(a => a.AuthorId == authorId);
        }

        public async Task<bool> ExistsAsync(int id)
        {
            return await _context.Authors.AnyAsync(a => a.Id == id);
        }
    }
}
