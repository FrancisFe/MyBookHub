using MyBookHub.Data.Entities;
using MyBookHub.Data.Enums;

namespace MyBookHub.Data.Repositories.Interfaces
{
    public interface ICartRepository
    {
        Task<Cart?> GetCartByUserIdAsync(int userId);
        Task<Cart> CreateCartAsync(Cart cart);
        Task ClearCartAsync(int userId);

        // ===== CART ITEMS =====
        Task<CartItem?> GetCartItemAsync(int cartId, int bookId, TransactionType type);
        Task AddItemToCartAsync(CartItem cartItem);
        Task UpdateCartItemQuantityAsync(int cartItemId, int quantity);
        Task RemoveItemFromCartAsync(int cartItemId);
        Task<IEnumerable<CartItem>> GetCartItemsAsync(int cartId);

        // ===== UTILIDADES =====
        Task<bool> CartExistsForUserAsync(int userId);
        Task<int> GetCartItemCountAsync(int cartId);
        Task<decimal> GetCartTotalAsync(int cartId);

    }
}
