using MyBookHub.Business.DTOs.Cart;

namespace MyBookHub.Business.Services.Interfaces
{
    public interface ICartService
    {

        Task<CartDto?> GetCartByUserIdAsync(int userId);
        Task<CartDto> GetOrCreateCartAsync(int userId);

        Task<CartDto> AddItemToCartAsync(int userId, AddToCartDto addToCartDto);
        Task<CartDto> UpdateCartItemQuantityAsync(int userId, int cartItemId, int quantity);
        Task<CartDto> RemoveItemFromCartAsync(int userId, int cartItemId);
        Task ClearCartAsync(int userId);


        Task ValidateCartStockAsync(int userId);
        Task<bool> CanAddItemToCartAsync(int userId, int bookId, int quantity, string type);
        Task<int> GetCartItemCountAsync(int userId);
        Task<decimal> GetCartTotalAsync(int userId);
    }
}
