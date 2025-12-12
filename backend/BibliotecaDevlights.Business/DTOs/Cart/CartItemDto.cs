namespace BibliotecaDevlights.Business.DTOs.Cart
{
    public class CartItemDto
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Subtotal { get; set; }
        public string Type { get; set; } = string.Empty; // Compra o alquiler

        public string BookTitle { get; set; } = string.Empty;
        public string BookISBN { get; set; } = string.Empty;
        public string? BookImageUrl { get; set; }
        public string AuthorFullName { get; set; } = string.Empty;

    }
}
