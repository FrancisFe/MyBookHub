namespace BibliotecaDevlights.Business.DTOs.Author
{
    public class CreateAuthorDto
    {
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string? Biography { get; set; }
    }
}
