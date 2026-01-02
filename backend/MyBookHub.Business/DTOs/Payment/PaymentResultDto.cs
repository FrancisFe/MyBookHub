namespace MyBookHub.Business.DTOs.Payment
{
    public class PaymentResultDto
    {
        public bool IsSuccess { get; set; }
        public string? TransactionId { get; set; }
        public string Message { get; set; } = string.Empty;
        public DateTime ProcessedAt { get; set; }
    }
}
