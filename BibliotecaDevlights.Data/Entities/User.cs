using System;
using System.Collections.Generic;
using System.Text;

namespace BibliotecaDevlights.Data.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Img { get; set; }
        public bool IsAdmin { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public string PasswordHash { get; set; } = string.Empty;
    }
}
