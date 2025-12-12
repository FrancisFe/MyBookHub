using AutoMapper;
using BibliotecaDevlights.Business.DTOs.Category;
using BibliotecaDevlights.Data.Entities;

namespace BibliotecaDevlights.Business.Mapping
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            CreateMap<UpdateCategoryDto, Category>();
            CreateMap<CreateCategoryDto, Category>();
            CreateMap<Category, CategoryDto>();
        }
    }
}
