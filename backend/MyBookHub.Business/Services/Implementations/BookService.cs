using AutoMapper;
using MyBookHub.Business.DTOs.Book;
using MyBookHub.Business.Services.Interfaces;
using MyBookHub.Data.Entities;
using MyBookHub.Data.Repositories.Interfaces;

namespace MyBookHub.Business.Services.Implementations
{
    public class BookService : IBookService
    {
        private readonly IMapper _mapper;
        private readonly IBookRepository _bookRepository;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IAuthorRepository _authorRepository;

        public BookService(IMapper mapper, IBookRepository bookRepository, ICategoryRepository categoryRepository, IAuthorRepository authorRepository)
        {
            _mapper = mapper;
            _bookRepository = bookRepository;
            _categoryRepository = categoryRepository;
            _authorRepository = authorRepository;
        }

        public async Task<IEnumerable<BookDto>> GetAllAsync()
        {
            var books = await _bookRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<BookDto>>(books);
        }

        public async Task<BookDetailsDto> GetByIdAsync(int id)
        {
            var book = await _bookRepository.GetByIdAsync(id);
            if (book == null)
            {
                throw new KeyNotFoundException($"Libro con Id {id} no encontrado");
            }
            return _mapper.Map<BookDetailsDto>(book);
        }

        public async Task<BookDto> CreateAsync(CreateBookDto createBook)
        {
            if (createBook == null)
                throw new ArgumentNullException(nameof(createBook));

            var authorExists = await _authorRepository.ExistsAsync(createBook.AuthorId);
            if (!authorExists)
                throw new KeyNotFoundException($"Autor con Id {createBook.AuthorId} no encontrado");

            var categoryExists = await _categoryRepository.ExistsAsync(createBook.CategoryId);
            if (!categoryExists)
                throw new KeyNotFoundException($"Categoría con Id {createBook.CategoryId} no encontrada");

            var bookEntity = _mapper.Map<Book>(createBook);
            await _bookRepository.AddAsync(bookEntity);
            var bookDto = _mapper.Map<BookDto>(bookEntity);
            return bookDto;
        }

        public async Task<BookDto> UpdateAsync(int id, UpdateBookDto updateBookDto)
        {
            if (updateBookDto == null)
                throw new ArgumentNullException(nameof(updateBookDto));

            var authorExists = await _authorRepository.ExistsAsync(updateBookDto.AuthorId);
            if (!authorExists)
                throw new KeyNotFoundException($"Autor con Id {updateBookDto.AuthorId} no encontrado");


            var categoryExists = await _categoryRepository.ExistsAsync(updateBookDto.CategoryId);
            if (!categoryExists)
                throw new KeyNotFoundException($"Categoría con Id {updateBookDto.CategoryId} no encontrada");

            var bookEntity = _mapper.Map<Book>(updateBookDto);

            var updatedBook = await _bookRepository.UpdateAsync(id, bookEntity);
            if (updatedBook == null)
                throw new KeyNotFoundException($"Libro con Id {id} no encontrado");

            return _mapper.Map<BookDto>(updatedBook);
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var result = await _bookRepository.DeleteAsync(id);
            if (!result)
            {
                throw new KeyNotFoundException($"Libro con Id {id} no encontrado");
            }
            return result;
        }

        public async Task<IEnumerable<BookDto>> GetBooksByAuthorIdAsync(int authorId)
        {
            var authorExists = await _authorRepository.ExistsAsync(authorId);
            if (!authorExists)
                throw new KeyNotFoundException($"Autor con Id {authorId} no encontrado");

            var books = await _bookRepository.GetByAuthorAsync(authorId);
            return _mapper.Map<IEnumerable<BookDto>>(books);
        }

        public async Task<IEnumerable<BookDto>> GetBooksByCategoryIdAsync(int categoryId)
        {
            var categoryExists = await _categoryRepository.ExistsAsync(categoryId);
            if (!categoryExists)
                throw new KeyNotFoundException($"Categoría con Id {categoryId} no encontrada");

            var books = await _bookRepository.GetByCategoryAsync(categoryId);
            return _mapper.Map<IEnumerable<BookDto>>(books);
        }

        public async Task<IEnumerable<BookDto>> SearchBooksAsync(string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                throw new ArgumentException("El término de búsqueda no puede estar vacío", nameof(searchTerm));

            var books = await _bookRepository.SearchAsync(searchTerm);
            return _mapper.Map<IEnumerable<BookDto>>(books);
        }
    }
}
