using AutoMapper;
using MyBookHub.Business.DTOs.Author;
using MyBookHub.Data.Entities;

namespace MyBookHub.Business.Mapping
{
    public class AuthorProfile : Profile
    {
        public AuthorProfile()
        {
            CreateMap<CreateAuthorDto, Author>();
            CreateMap<UpdateAuthorDto, Author>();
            CreateMap<Author, AuthorDto>()
                .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => 
                    $"{src.FirstName} {src.LastName}"));
        }
    }
}
