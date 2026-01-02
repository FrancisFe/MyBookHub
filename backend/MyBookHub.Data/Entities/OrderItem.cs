using MyBookHub.Data.Enums;

namespace MyBookHub.Data.Entities
{
    public class OrderItem
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public TransactionType Type { get; set; } = TransactionType.Purchase;
        public DateTime? RentalStartDate { get; set; }
        public DateTime? RentalEndDate { get; set; }
        public DateTime? RentalReturnedDate { get; set; }
        public bool IsReturned { get; set; } = false;
        public Order Order { get; set; } = null!;
        public Book? Book { get; set; }
    }
}
