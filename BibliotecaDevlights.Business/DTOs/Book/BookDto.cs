namespace BibliotecaDevlights.Business.DTOs.Book
{
    public class BookDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ISBN { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal RentalPricePerDay { get; set; }
        public int StockPurchase { get; set; }
        public int StockRental { get; set; }
        public string? ImageUrl { get; set; }

        public int AuthorId { get; set; }
        public string AuthorName { get; set; } = string.Empty;
        public int CategoryId { get; set; }
        public string CategoryName { get; set; } = string.Empty;

    }
}
