using AutoMapper;
using BibliotecaDevlights.Business.DTOs.Cart;
using BibliotecaDevlights.Data.Entities;

namespace BibliotecaDevlights.Business.Mapping
{
    public class CartProfile : Profile
    {
        public CartProfile()
        {
            // CreateMap<Source, Destination>();
            CreateMap<CartDto, Cart>();
            CreateMap<AddToCartDto, Cart>();
            CreateMap<CartItemDto, CartItem>();
            CreateMap<UpdateCartItemDto, CartItem>();
            CreateMap<Cart, CartDto>()
                .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src.CartItems))
                .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => src.CartItems != null ? src.CartItems.Sum(ci => ci.Price * ci.Quantity) : 0))
                .ForMember(dest => dest.ItemCount, opt => opt.MapFrom(src => src.CartItems != null ? src.CartItems.Sum(ci => ci.Quantity) : 0));

            CreateMap<CartItem, CartItemDto>()
                .ForMember(dest => dest.UnitPrice, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Subtotal, opt => opt.MapFrom(src => src.Price * src.Quantity))
                .ForMember(dest => dest.BookTitle, opt => opt.MapFrom(src => src.Book != null ? src.Book.Title : ""))
                .ForMember(dest => dest.BookISBN, opt => opt.MapFrom(src => src.Book != null ? src.Book.ISBN : ""))
                .ForMember(dest => dest.BookImageUrl, opt => opt.MapFrom(src => src.Book != null ? src.Book.ImageUrl : ""))
                .ForMember(dest => dest.AuthorFullName, opt => opt.MapFrom(src =>
                    src.Book != null && src.Book.Author != null
                        ? $"{src.Book.Author.FirstName} {src.Book.Author.LastName}"
                        : ""));
        }
    }
}
