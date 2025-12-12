using BibliotecaDevlights.Business.DTOs.Author;
using BibliotecaDevlights.Business.DTOs.Category;

namespace BibliotecaDevlights.Business.DTOs.Book
{
    public class BookDetailsDto
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
        public DateTime? PublishedDate { get; set; }

        // Objetos completos de relaciones
        public CategoryDto Category { get; set; } = null!;
        public AuthorDto Author { get; set; } = null!;
    }
}
