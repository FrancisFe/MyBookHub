using AutoMapper;
using MyBookHub.Business.DTOs.Category;
using MyBookHub.Data.Entities;

namespace MyBookHub.Business.Mapping
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
