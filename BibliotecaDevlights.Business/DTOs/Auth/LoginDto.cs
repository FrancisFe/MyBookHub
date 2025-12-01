using System;
using System.Collections.Generic;
using System.Text;

namespace BibliotecaDevlights.Business.DTOs.Auth
{
    public class LoginDto
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }
}
