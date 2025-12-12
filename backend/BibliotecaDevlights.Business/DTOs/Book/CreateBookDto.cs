namespace BibliotecaDevlights.Business.DTOs.Book
{
    public class CreateBookDto
    {
        public string Title { get; set; } = string.Empty;
        public string ISBN { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal RentalPricePerDay { get; set; }
        public int StockPurchase { get; set; }
        public int StockRental { get; set; }
        public string? ImageUrl { get; set; }
        public DateTime? PublishedDate { get; set; }

        public int CategoryId { get; set; }
        public int AuthorId { get; set; }
    }
}
