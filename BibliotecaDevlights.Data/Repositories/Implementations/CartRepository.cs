using BibliotecaDevlights.Data.Data;
using BibliotecaDevlights.Data.Entities;
using BibliotecaDevlights.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaDevlights.Data.Repositories.Implementations
{
    public class CartRepository : ICartRepository
    {
        private readonly AppDbContext _context;
        public CartRepository(AppDbContext context)
        {
            _context = context;
        }

        //Carts
        public async Task<Cart?> GetCartByUserIdAsync(int userId)
        {
           return await _context.Carts.FirstOrDefaultAsync(c => c.UserId == userId);
        }

        public async Task<Cart> CreateCartAsync(Cart cartCreate)
        {
            var existingCart = await GetCartByUserIdAsync(cartCreate.UserId);
            if (existingCart != null)
                return existingCart;

            await _context.Carts.AddAsync(cartCreate);
            await _context.SaveChangesAsync();
            return cartCreate;
        }
        public async Task ClearCartAsync(int userId)
        {
            var cart = await GetCartByUserIdAsync(userId);
            if (cart != null)
            {
                await _context.CartItems
                    .Where(ci => ci.CartId == cart.Id)
                    .ExecuteDeleteAsync();
            }
        }

        //Cart Items
        public async Task<IEnumerable<CartItem>> GetCartItemsAsync(int cartId)
        {
            return await _context.CartItems.Where(ci => ci.CartId == cartId).AsNoTracking().ToListAsync();
        }

        public async Task<CartItem?> GetCartItemAsync(int cartId, int bookId)
        {
            return await _context.CartItems.FirstOrDefaultAsync(ci => ci.CartId == cartId && ci.BookId == bookId);
        }
        public async Task AddItemToCartAsync(CartItem cartItem)
        {
            await _context.CartItems.AddAsync(cartItem);
            await _context.SaveChangesAsync();

        }
        public async Task UpdateCartItemQuantityAsync(int cartItemId, int quantity)
        {
            await _context.CartItems
        .Where(ci => ci.Id == cartItemId)
        .ExecuteUpdateAsync(s => s.SetProperty(ci => ci.Quantity, quantity));
        }

        public async Task RemoveItemFromCartAsync(int cartItemId)
        {
            await _context.CartItems
                .Where(ci => ci.Id == cartItemId)
                .ExecuteDeleteAsync();
        }

        //Utilities
        public async Task<bool> CartExistsForUserAsync(int userId)
        {
           return await _context.Carts.AnyAsync(c => c.UserId == userId);
        }

        public Task<int> GetCartItemCountAsync(int cartId)
        {
            return _context.CartItems.CountAsync(ci => ci.CartId == cartId);
        }
        public Task<decimal> GetCartTotalAsync(int cartId)
        {
            return _context.CartItems
                .Where(ci => ci.CartId == cartId)
                .SumAsync(ci => ci.Quantity * ci.Price);
        }



    }
}
