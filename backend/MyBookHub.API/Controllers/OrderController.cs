using MyBookHub.Business.DTOs.Order;
using MyBookHub.Business.Services.Interfaces;
using MyBookHub.Business.Utilities;
using MyBookHub.Data.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MyBookHub.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IUserContextService _userContextService;

        public OrderController(IOrderService orderService, IUserContextService userContextService)
        {
            _orderService = orderService;
            _userContextService = userContextService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<OrderSimpleDto>>> GetAllOrders()
        {
            var orders = await _orderService.GetAllOrdersAsync();
            return Ok(orders);
        }

        [HttpGet("{orderId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<OrderDto?>> GetOrderById(int orderId)
        {
            var userId = _userContextService.GetUserId();
            var order = await _orderService.GetOrderByIdAsync(orderId, userId);
            return Ok(order);
        }

        [HttpGet("user/my-orders")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetMyOrders()
        {
            var userId = _userContextService.GetUserId();
            var orders = await _orderService.GetOrdersByUserIdAsync(userId);
            return Ok(orders);
        }

        [HttpGet("details")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetAllOrdersWithDetails()
        {
            var orders = await _orderService.GetAllOrdersWithDetailsAsync();
            return Ok(orders);
        }

        [HttpGet("details/user/{userId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOrdersByUserIdWithDetailsAsync(int userId)
        {
            var currentUserId = _userContextService.GetUserId();

            if (currentUserId != userId)
            {
                return Forbid();
            }

            var orders = await _orderService.GetOrdersByUserIdWithDetailsAsync(userId);
            return Ok(orders);
        }

        [HttpPost]
        public async Task<ActionResult<OrderDto>> CreateOrder()
        {
            var userId = _userContextService.GetUserId();
            var order = await _orderService.CreateOrderFromCartAsync(userId);
            return Ok(order);
        }

        [HttpPut("{orderId}/{status}")]
        public async Task<ActionResult> UpdateOrderStatus(int orderId, OrderStatus status)
        {
            await _orderService.UpdateOrderStatusAsync(orderId, status);
            return NoContent();
        }

        [HttpDelete("{orderId}")]
        public async Task<ActionResult> CancelOrder(int orderId)
        {
            var userId = _userContextService.GetUserId();
            await _orderService.CancelOrderAsync(orderId, userId);
            return NoContent();
        }

        [HttpPut("{orderId}/mark-returned")]
        public async Task<ActionResult> MarkAsReturned(int orderId)
        {
            var userId = _userContextService.GetUserId();
            await _orderService.MarkAsReturnedAsync(orderId, userId);
            return NoContent();
        }

        [HttpGet("activerentals")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetActiveRentals()
        {
            var userId = _userContextService.GetUserId();
            var orders = await _orderService.GetActiveRentalsAsync(userId);
            return Ok(orders);
        }

        [HttpGet("overduerentals")]
        public async Task<ActionResult<IEnumerable<OrderDto>>> GetOverdueRentals()
        {
            var userId = _userContextService.GetUserId();
            var orders = await _orderService.GetOverdueRentalsAsync(userId);
            return Ok(orders);
        }
    }
}
