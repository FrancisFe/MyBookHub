using AutoMapper;
using MyBookHub.Business.DTOs.User;
using MyBookHub.Data.Entities;

namespace MyBookHub.Business.Mapping
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDto>();
        }
    }
}
