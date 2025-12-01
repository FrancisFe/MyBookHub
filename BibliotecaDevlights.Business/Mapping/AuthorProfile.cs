using AutoMapper;
using BibliotecaDevlights.Business.DTOs.Author;
using BibliotecaDevlights.Data.Entities;

namespace BibliotecaDevlights.Business.Mapping
{
    public class AuthorProfile : Profile
    {
        public AuthorProfile()
        {
            CreateMap<CreateAuthorDto, Author>();
            CreateMap<UpdateAuthorDto, Author>();
            CreateMap<Author, AuthorDto>();
        }
    }
}
