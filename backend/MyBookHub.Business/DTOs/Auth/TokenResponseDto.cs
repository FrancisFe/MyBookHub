namespace MyBookHub.Business.DTOs.Auth
{
    public class TokenResponseDto
    {
        public string? Token { get; set; }
        public DateTime ExpiresIn { get; set; }
    }
}
