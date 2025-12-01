using BibliotecaDevlights.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BibliotecaDevlights.Data.Repositories.Interfaces
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllAsync();
        Task<Category?> GetByIdAsync(int id);
        Task AddAsync(Category newCategory);
        Task<Category?> UpdateAsync(int id, Category updatedCategory);
        Task<bool> DeleteAsync(int id);
        Task<bool> HasAssociatedBooksAsync(int categoryId);
        Task<bool> ExistsAsync(int id);
    }
}
