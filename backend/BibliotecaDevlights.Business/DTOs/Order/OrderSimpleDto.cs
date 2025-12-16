namespace BibliotecaDevlights.Business.DTOs.Order
{
    public class OrderSimpleDto
    {
        public int UserId { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string Status { get; set; } = string.Empty;
    }
}
