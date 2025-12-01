using BibliotecaDevlights.Business.DTOs.Book;
using BibliotecaDevlights.Data.Entities;

namespace BibliotecaDevlights.Business.Services.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<BookDto>> GetAllAsync();
        Task<BookDetailsDto> GetByIdAsync(int id);
        Task<BookDto> CreateAsync(CreateBookDto createBookDto);
        Task<BookDto> UpdateAsync(int id, UpdateBookDto updateBookDto);
        Task<bool> DeleteAsync(int id);

        Task<IEnumerable<BookDto>> GetBooksByAuthorIdAsync(int authorId);
        Task<IEnumerable<BookDto>> GetBooksByCategoryIdAsync(int categoryId);
        Task<IEnumerable<BookDto>> SearchBooksAsync(string searchTerm);



    }
}
