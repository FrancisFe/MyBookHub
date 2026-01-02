using MyBookHub.Data.Data;
using MyBookHub.Data.Entities;
using MyBookHub.Data.Enums;
using MyBookHub.Data.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace MyBookHub.Data.Repositories.Implementations
{
    public class OrderRepository : IOrderRepository
    {
        private readonly AppDbContext _context;
        public OrderRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<Order>> GetAllAsync()
        {
            return await _context.Orders.AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetAllWithDetailsAsync()
        {
            return await _context.Orders
                .AsNoTracking()
                .Include(u => u.User)
                .Include(o => o.OrderItems!)
                .ThenInclude(b => b.Book)
                .ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserIdAsync(int userId)
        {
            return await _context.Orders.AsNoTracking()
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems!)
                .ThenInclude(b => b.Book)
                .ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetOrdersByUserIdWithDetailsAsync(int userId)
        {
            return await _context.Orders
                .AsNoTracking()
                .Where(o => o.UserId == userId)
                .Include(oi => oi.OrderItems!)
                .ThenInclude(b => b.Book)
                .ToListAsync();
        }
        public async Task<Order?> GetByIdAsync(int orderId)
        {
            return await _context.Orders
                .Include(u => u.User)
                .Where(o => o.Id == orderId)
                .Include(o => o.OrderItems!)
                .ThenInclude(b => b.Book)
                .FirstOrDefaultAsync();
        }
        public async Task AddAsync(Order order)
        {
            await _context.Orders.AddAsync(order);
            await _context.SaveChangesAsync();
        }
        public async Task<bool> DeleteAsync(int orderId)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order == null)
            {
                return false;
            }
            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(int orderId)
        {
            return await _context.Orders.AnyAsync(o => o.Id == orderId);

        }

        public async Task<bool> UpdateOrderStatusAsync(int orderId, OrderStatus status)
        {
            var order = await _context.Orders.FindAsync(orderId);
            if (order != null)
            {
                order.Status = status;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<bool> UserOwnsOrderAsync(int orderId, int userId)
        {
            return await _context.Orders.AnyAsync(o => o.Id == orderId && o.UserId == userId);
        }
        public async Task UpdateAsync(Order order)
        {
            _context.Orders.Update(order);
            await _context.SaveChangesAsync();
        }
        public async Task<IEnumerable<Order>> GetActiveRentalsByUserIdAsync(int userId)
        {
            return await _context.Orders
                .AsNoTracking()
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems!)
                .ThenInclude(oi => oi.Book)
                .Where(o => o.OrderItems!.Any(oi => oi.Type == TransactionType.Rental && !oi.IsReturned))
                .ToListAsync();

        }

        public async Task<IEnumerable<Order>> GetOverdueRentalsAsync(int userId)
        {
            var currentDate = DateTime.UtcNow;
            return await _context.Orders
                .AsNoTracking()
                .Where(o => o.UserId == userId)
                .Include(o => o.OrderItems!)
                .ThenInclude(oi => oi.Book)
                .Where(o => o.OrderItems!.Any(oi => oi.Type == TransactionType.Rental && !oi.IsReturned && oi.RentalEndDate < currentDate))
                .ToListAsync();

        }
    }
}
