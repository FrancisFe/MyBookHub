namespace BibliotecaDevlights.Business.DTOs.Cart
{
    public class CartDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<CartItemDto> Items { get; set; } = new List<CartItemDto>();

        public decimal TotalPrice { get; set; }
        public int ItemCount { get; set; }

    }
}
