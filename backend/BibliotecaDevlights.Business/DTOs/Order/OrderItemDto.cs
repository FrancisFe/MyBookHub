using BibliotecaDevlights.Data.Enums;

namespace BibliotecaDevlights.Business.DTOs.Order
{
    public class OrderItemDto
    {
        public int Id { get; set; }
        public int BookId { get; set; }
        public string BookTitle { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public TransactionType Type { get; set; } = TransactionType.Purchase;
        public decimal Subtotal => Price * Quantity;
    }
}
