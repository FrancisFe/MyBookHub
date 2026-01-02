using MyBookHub.Data.Enums;

namespace MyBookHub.Data.Entities
{
    public class Payment
    {
        public int Id { get; set; }

        public int OrderId { get; set; }
        public string TransactionId { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public PaymentMethod PaymentMethod { get; set; } 
        public string Status { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; }
        public DateTime? ProcessedAt { get; set; }
        public string? Message { get; set; }
        public string? ErrorCode { get; set; }

        public Order Order { get; set; } = null!;
    }
}
