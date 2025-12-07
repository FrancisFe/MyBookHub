using BibliotecaDevlights.Data.Enums;

namespace BibliotecaDevlights.Data.Entities
{
    public class CartItem
    {
        public int Id { get; set; }
        public int CartId { get; set; }
        public int BookId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public TransactionType Type { get; set; } = TransactionType.Purchase;
        public DateTime? RentalStartDate { get; set; }
        public DateTime? RentalEndDate { get; set; }
        public Cart Cart { get; set; } = null!;
        public Book? Book
        {
            get; set;
        }
    }
}
