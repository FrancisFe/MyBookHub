using BibliotecaDevlights.Business.DTOs.Payment;
using BibliotecaDevlights.Business.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BibliotecaDevlights.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;
        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }   

        [HttpGet("process")]
        public async Task<ActionResult<PaymentResultDto>> ProcessPayment([FromBody] PaymentRequestDto paymentRequest)
        {
            try
            {
                var result = await _paymentService.ProcessPaymentAsync(paymentRequest);

                if (result.IsSuccess)
                {
                    return Ok(result);
                }
                else
                {
                    return BadRequest(result);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error al procesar el pago", error = ex.Message });
            }
        }
    }
}
