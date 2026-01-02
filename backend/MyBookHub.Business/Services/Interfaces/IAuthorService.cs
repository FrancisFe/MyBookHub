using MyBookHub.Business.DTOs.Author;

namespace MyBookHub.Business.Services.Interfaces
{
    public interface IAuthorService
    {
        Task<IEnumerable<AuthorDto>> GetAllAsync();
        Task<AuthorDto> GetByIdAsync(int id);
        Task<AuthorDto> CreateAsync(CreateAuthorDto createBookDto);
        Task<AuthorDto> UpdateAsync(int id, UpdateAuthorDto updateBookDto);
        Task<bool> DeleteAsync(int id);
    }
}
