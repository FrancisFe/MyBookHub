using AutoMapper;
using BibliotecaDevlights.Business.DTOs.Order;
using BibliotecaDevlights.Data.Entities;

namespace BibliotecaDevlights.Business.Mapping
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.OrderItems));

            CreateMap<OrderDto, Order>()
                .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString()))
                .ForMember(dest => dest.OrderItems, opt => opt.MapFrom(src => src.Items));


            CreateMap<OrderItem, OrderItemDto>()
                .ForMember(dest => dest.BookTitle, opt => opt.MapFrom(src =>
                    src.Book != null ? src.Book.Title : string.Empty));

            CreateMap<OrderItemDto, OrderItem>().ReverseMap();

            CreateMap<OrderSimpleDto, Order>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.ToString())).ReverseMap();
        }
    }
}
