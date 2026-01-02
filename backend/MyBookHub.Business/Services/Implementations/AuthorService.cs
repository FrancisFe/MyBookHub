using AutoMapper;
using MyBookHub.Business.DTOs.Author;
using MyBookHub.Business.Services.Interfaces;
using MyBookHub.Data.Entities;
using MyBookHub.Data.Repositories.Interfaces;

namespace MyBookHub.Business.Services.Implementations
{
    public class AuthorService : IAuthorService
    {
        private readonly IAuthorRepository _authorRepository;
        private readonly IMapper _mapper;
        public AuthorService(IAuthorRepository authorRepository, IMapper mapper)
        {
            _authorRepository = authorRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<AuthorDto>> GetAllAsync()
        {
            var authors = await _authorRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<AuthorDto>>(authors);
        }

        public async Task<AuthorDto> GetByIdAsync(int id)
        {
            var author = await _authorRepository.GetByIdAsync(id);
            if (author == null)
            {
                throw new KeyNotFoundException("Author not found");
            }
            return _mapper.Map<AuthorDto>(author);
        }

        public async Task<AuthorDto> CreateAsync(CreateAuthorDto createAuthor)
        {
            if (createAuthor == null)
            {
                throw new ArgumentNullException(nameof(createAuthor));
            }
            var authorEntity = _mapper.Map<Author>(createAuthor);

            await _authorRepository.AddAsync(authorEntity);
            var authorDto = _mapper.Map<AuthorDto>(authorEntity);
            return authorDto;
        }

        public async Task<AuthorDto> UpdateAsync(int id, UpdateAuthorDto updateAuthor)
        {
            if (updateAuthor == null)
            {
                throw new ArgumentNullException(nameof(updateAuthor));
            }
            var authorEntity = _mapper.Map<Author>(updateAuthor);
            var authorExisting = await _authorRepository.UpdateAsync(id, authorEntity);
            if (authorExisting == null)
            {
                throw new KeyNotFoundException("Author not found");
            }
            var authorDto = _mapper.Map<AuthorDto>(authorExisting);
            return authorDto;


        }
        public async Task<bool> DeleteAsync(int id)
        {
            var result = await _authorRepository.DeleteAsync(id);
            if (!result)
            {
                throw new KeyNotFoundException("Author not found");
            }
            return result;
        }

    }
}
