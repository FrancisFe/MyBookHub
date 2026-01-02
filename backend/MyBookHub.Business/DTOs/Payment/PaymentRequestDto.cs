using MyBookHub.Data.Enums;

namespace MyBookHub.Business.DTOs.Payment
{
    public class PaymentRequestDto
    {
        public int OrderId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }

        public string? CardNumber { get; set; }
        public string? CardType { get; set; }
        public string? ExpiryDate { get; set; }
        public string? CVV { get; set; }
    }
}
