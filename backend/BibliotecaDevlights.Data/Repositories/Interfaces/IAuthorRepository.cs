using BibliotecaDevlights.Data.Entities;

namespace BibliotecaDevlights.Data.Repositories.Interfaces
{
    public interface IAuthorRepository
    {
        Task<IEnumerable<Author>> GetAllAsync();
        Task<Author?> GetByIdAsync(int id);
        Task AddAsync(Author newAuthor);
        Task<Author?> UpdateAsync(int id, Author updateAuthor);
        Task<bool> DeleteAsync(int id);
        Task<bool> HasAssociatedBooksAsync(int authorId);
        Task<bool> ExistsAsync(int id);
    }
}
