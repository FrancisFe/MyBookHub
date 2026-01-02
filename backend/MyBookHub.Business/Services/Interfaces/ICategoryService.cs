using MyBookHub.Business.DTOs.Category;

namespace MyBookHub.Business.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllAsync();
        Task<CategoryDto> GetByIdAsync(int id);
        Task<CategoryDto> CreateAsync(CreateCategoryDto createBookDto);
        Task<CategoryDto> UpdateAsync(int id, UpdateCategoryDto updateBookDto);
        Task<bool> DeleteAsync(int id);
    }
}
