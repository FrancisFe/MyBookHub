using BibliotecaDevlights.Business.DTOs.Payment;
using BibliotecaDevlights.Business.Services.Interfaces;
using BibliotecaDevlights.Data.Enums;

namespace BibliotecaDevlights.Business.Services.Implementations
{
    public class PaymentService : IPaymentService
    {
        private readonly IOrderService _orderService;
        public PaymentService(IOrderService orderService)
        {
            _orderService = orderService;
        }
        public async Task<PaymentResultDto> ProcessPaymentAsync(PaymentRequestDto paymentRequest)
        {
            var random = new Random();
            var isSucces = random.Next(1, 11) <= 9;

            if (isSucces)
            {
                return await SimulateSuccessfulPaymentAsync(paymentRequest.OrderId);
            }
            else
            {
                return await SimulateFailedPaymentAsync(paymentRequest.OrderId);
            }
        }
        public async Task<PaymentResultDto> SimulateSuccessfulPaymentAsync(int orderId)
        {
            await _orderService.UpdateOrderStatusAsync(orderId, OrderStatus.Paid);
            return new PaymentResultDto
            {
                IsSuccess = true,
                TransactionId = Guid.NewGuid().ToString(),
                Message = "Pago procesado exitosamente",
                ProcessedAt = DateTime.UtcNow

            };
        }
        public async Task<PaymentResultDto> SimulateFailedPaymentAsync(int orderId)
        {
            await _orderService.UpdateOrderStatusAsync(orderId, OrderStatus.Rejected);
            return new PaymentResultDto
            {
                IsSuccess = false,
                TransactionId = null,
                Message = "El pago fue rechazado, prueba nuevamente",
                ProcessedAt = DateTime.UtcNow

            };
        }
    }
}
