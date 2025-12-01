using AutoMapper;
using BibliotecaDevlights.Business.DTOs.Book;
using BibliotecaDevlights.Data.Entities;

namespace BibliotecaDevlights.Business.Mapping
{
    public class BookProfile : Profile
    {
        public BookProfile()
        {
            CreateMap<CreateBookDto, Book>();
            CreateMap<UpdateBookDto, Book>();
            CreateMap<Book, BookDto>();
            CreateMap<Book, BookDetailsDto>();
        }
    }
}
