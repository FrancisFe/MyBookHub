using BibliotecaDevlights.Business.DTOs.Cart;
using BibliotecaDevlights.Business.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BibliotecaDevlights.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<CartDto>> GetCart(int userId)
        {
            var cart =await _cartService.GetOrCreateCartAsync(userId);
            return Ok(cart);
        }

        [HttpPost("{userId}/items")]
        public async Task<ActionResult<CartDto>> AddItemToCart(int userId , [FromBody] AddToCartDto addToCart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var cart = await _cartService.AddItemToCartAsync(userId, addToCart);
            return Ok(cart);
        }

        // POST api/<CartController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<CartController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CartController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
