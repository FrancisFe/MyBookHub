using BibliotecaDevlights.Business.DTOs.Auth;
using BibliotecaDevlights.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BibliotecaDevlights.Business.Services.Interfaces
{
    public interface IAuthService
    {
        Task<User?> RegisterAsync(RegisterDto request);
        Task<string?> LoginAsync(LoginDto request);
    }
}
