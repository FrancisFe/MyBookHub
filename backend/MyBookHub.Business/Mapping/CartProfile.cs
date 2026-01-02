using AutoMapper;
using MyBookHub.Business.DTOs.Cart;
using MyBookHub.Data.Entities;
using MyBookHub.Data.Enums;

namespace MyBookHub.Business.Mapping
{
    public class CartProfile : Profile
    {
        public CartProfile()
        {
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
                .ForMember(dest => dest.Subtotal, opt => opt.MapFrom(src => 
                    src.Type == TransactionType.Purchase 
                        ? src.Price * src.Quantity
                        : src.Price * src.Quantity * Math.Max(1, 
                            (src.RentalEndDate.HasValue && src.RentalStartDate.HasValue 
                                ? (src.RentalEndDate.Value.Date - src.RentalStartDate.Value.Date).Days 
                                : 1))))
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString()))
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
