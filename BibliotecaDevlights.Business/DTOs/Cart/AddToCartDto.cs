namespace BibliotecaDevlights.Business.DTOs.Cart
{
    public class AddToCartDto
    {
        public int BookId { get; set; }
        public int Quantity { get; set; } = 1;
        public string Type { get; set; } = "Purchase";

        public DateTime? RentalStartDate { get; set; }
        public DateTime? RentalEndDate { get; set; }
    }
}
