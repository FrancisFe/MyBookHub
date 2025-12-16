using BibliotecaDevlights.Data.Enums;

namespace BibliotecaDevlights.Business.DTOs.Order
{
    public class OrderDto
    {
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public OrderStatus Status { get; set; } = OrderStatus.Pending;
        public ICollection<OrderItemDto> Items { get; set; } = [];
    }
}
