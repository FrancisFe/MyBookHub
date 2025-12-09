using BibliotecaDevlights.Business.DTOs.Payment;

namespace BibliotecaDevlights.Business.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<PaymentResultDto> ProcessPaymentAsync(PaymentRequestDto paymentRequest);
        Task<PaymentResultDto> SimulateSuccessfulPaymentAsync(int orderId);
        Task<PaymentResultDto> SimulateFailedPaymentAsync(int orderId);
    }
}
