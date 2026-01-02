using MyBookHub.Data.Data;
using MyBookHub.Data.Entities;
using MyBookHub.Data.Enums;
using Microsoft.AspNetCore.Identity;

namespace BibliotecaDevlight.Data.Seeders
{
    public static class DbInitializer
    {
        public static void Initialize(AppDbContext context)
        {
            // Verificar si ya hay datos
            if (context.Categories.Any())
            {
                return; // La BD ya tiene datos
            }

            // ===== USUARIOS =====
            var passwordHasher = new PasswordHasher<User>();
            var users = new User[]
            {
                new User
                {
                    UserName = "francis",
                    Email = "franciss.cs@hotmail.com",
                    PasswordHash = passwordHasher.HashPassword(null, "15545038"),
                    Role = UserRole.Admin,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                },
                new User
                {
                    UserName = "usuario1",
                    Email = "usuario1@mybookhub.com",
                    PasswordHash = passwordHasher.HashPassword(null, "User123_"),
                    Role = UserRole.User,
                    CreatedAt = DateTime.UtcNow,
                    UpdatedAt = DateTime.UtcNow
                }
            };

            context.Users.AddRange(users);
            context.SaveChanges();

            // ===== CATEGORÍAS =====
            var categories = new Category[]
            {
                new Category
                {
                    Name = "Ficción",
                    Description = "Novelas y cuentos de ficción literaria"
                },
                new Category
                {
                    Name = "Ciencia Ficción",
                    Description = "Historias futuristas y de ciencia ficción"
                },
                new Category
                {
                    Name = "Fantasía",
                    Description = "Mundos mágicos y fantásticos"
                },
                new Category
                {
                    Name = "Tecnología",
                    Description = "Libros sobre programación, desarrollo y tecnología"
                },
                new Category
                {
                    Name = "Autoayuda",
                    Description = "Desarrollo personal y motivación"
                },
                new Category
                {
                    Name = "Historia",
                    Description = "Libros históricos y biografías"
                },
                new Category
                {
                    Name = "Clásicos",
                    Description = "Literatura clásica universal"
                }
            };

            context.Categories.AddRange(categories);
            context.SaveChanges();

            // ===== AUTORES =====
            var authors = new Author[]
            {
                new Author
                {
                    FirstName = "George",
                    LastName = "Orwell",
                    Biography = "Escritor y periodista británico, autor de obras críticas sobre el totalitarismo."
                },
                new Author
                {
                    FirstName = "Gabriel",
                    LastName = "García Márquez",
                    Biography = "Escritor colombiano, Premio Nobel de Literatura 1982, exponente del realismo mágico."
                },
                new Author
                {
                    FirstName = "J.K.",
                    LastName = "Rowling",
                    Biography = "Autora británica, creadora de la saga de Harry Potter."
                },
                new Author
                {
                    FirstName = "Isaac",
                    LastName = "Asimov",
                    Biography = "Escritor y bioquímico estadounidense, maestro de la ciencia ficción."
                },
                new Author
                {
                    FirstName = "Robert",
                    LastName = "Martin",
                    Biography = "Ingeniero de software y autor, conocido como Uncle Bob."
                },
                new Author
                {
                    FirstName = "Paulo",
                    LastName = "Coelho",
                    Biography = "Escritor brasileño, uno de los autores más leídos del mundo."
                },
                new Author
                {
                    FirstName = "J.R.R.",
                    LastName = "Tolkien",
                    Biography = "Escritor británico, filólogo y creador de la Tierra Media."
                },
                new Author
                {
                    FirstName = "Miguel",
                    LastName = "de Cervantes",
                    Biography = "Escritor español, autor de Don Quijote de la Mancha."
                },
                new Author
                {
                    FirstName = "Antoine",
                    LastName = "de Saint-Exupéry",
                    Biography = "Escritor y aviador francés, autor de El Principito."
                }
            };

            context.Authors.AddRange(authors);
            context.SaveChanges();

            // ===== LIBROS =====
            var books = new Book[]
            {
                new Book
                {
                    Title = "1984",
                    ISBN = "9780451524935",
                    Description = "Una distopía que presenta un futuro totalitario donde el Gran Hermano todo lo ve.",
                    PurchasePrice = 15.99m,
                    RentalPricePerDay = 2.50m,
                    StockPurchase = 10,
                    StockRental = 5,
                    ImageUrl = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
                    PublishedDate = DateTime.SpecifyKind(new DateTime(1949, 6, 8), DateTimeKind.Utc),
                    CategoryId = categories[0].Id, // Ficción
                    AuthorId = authors[0].Id // George Orwell
                },
                new Book
                {
                    Title = "Cien Años de Soledad",
                    ISBN = "9780307474728",
                    Description = "La obra maestra del realismo mágico que narra la historia de la familia Buendía.",
                    PurchasePrice = 18.50m,
                    RentalPricePerDay = 3.00m,
                    StockPurchase = 8,
                    StockRental = 4,
                    ImageUrl = "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
                    PublishedDate = DateTime.SpecifyKind(new DateTime(1967, 5, 30), DateTimeKind.Utc),
                    CategoryId = categories[0].Id, // Ficción
                    AuthorId = authors[1].Id // Gabriel García Márquez
                },
                new Book
                {
                    Title = "Harry Potter y la Piedra Filosofal",
                    ISBN = "9788498382662",
                    Description = "El primer libro de la saga que narra las aventuras del joven mago Harry Potter.",
                    PurchasePrice = 20.00m,
                    RentalPricePerDay = 3.50m,
                    StockPurchase = 15,
                    StockRental = 8,
                    ImageUrl = "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?w=400",
                    PublishedDate = DateTime.SpecifyKind(new DateTime(1997, 6, 26), DateTimeKind.Utc),
                    CategoryId = categories[2].Id, // Fantasía
                    AuthorId = authors[2].Id // J.K. Rowling
                },
                new Book
                {
                    Title = "Fundación",
                    ISBN = "9788497593786",
                    Description = "Primera novela de la saga de Fundación, una obra maestra de la ciencia ficción.",
                    PurchasePrice = 16.99m,
                    RentalPricePerDay = 2.80m,
                    StockPurchase = 7,
                    StockRental = 3,
                    ImageUrl = "https://images.unsplash.com/photo-1531976283823-ff4d70a477ab?w=400",
                    PublishedDate = DateTime.SpecifyKind(new DateTime(1951, 5, 1), DateTimeKind.Utc),
                    CategoryId = categories[1].Id, // Ciencia Ficción
                    AuthorId = authors[3].Id // Isaac Asimov
                },
                new Book
                {
                    Title = "Clean Code",
                    ISBN = "9780132350884",
                    Description = "Manual de estilo para el desarrollo ágil de software. Escribe código limpio y mantenible.",
                    PurchasePrice = 45.00m,
                    RentalPricePerDay = 5.00m,
                    StockPurchase = 12,
                    StockRental = 6,
                    ImageUrl = "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
                    PublishedDate = DateTime.SpecifyKind(new DateTime(2008, 8, 1), DateTimeKind.Utc),
                    CategoryId = categories[3].Id, // Tecnología
                    AuthorId = authors[4].Id // Robert Martin
                },
                new Book
                {
                    Title = "El Alquimista",
                    ISBN = "9780062315007",
                    Description = "Una fábula sobre seguir tus sueños y escuchar a tu corazón.",
                    PurchasePrice = 14.99m,
                    RentalPricePerDay = 2.00m,
                    StockPurchase = 20,
                    StockRental = 10,
                    ImageUrl = "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
                    PublishedDate = DateTime.SpecifyKind(new DateTime(1988, 1, 1), DateTimeKind.Utc),
                    CategoryId = categories[4].Id, // Autoayuda
                    AuthorId = authors[5].Id // Paulo Coelho
                },
                new Book
                {
                    Title = "El Señor de los Anillos: La Comunidad del Anillo",
                    ISBN = "9788445077528",
                    Description = "Primera parte de la épica trilogía que narra la búsqueda para destruir el Anillo Único.",
                    PurchasePrice = 22.00m,
                    RentalPricePerDay = 4.00m,
                    StockPurchase = 10,
                    StockRental = 5,
                    ImageUrl = "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400",
                    PublishedDate = DateTime.SpecifyKind(new DateTime(1954, 7, 29), DateTimeKind.Utc),
                    CategoryId = categories[2].Id, // Fantasía
                    AuthorId = authors[6].Id // J.R.R. Tolkien
                },
                new Book
                {
                    Title = "Don Quijote de la Mancha",
                    ISBN = "9788424936419",
                    Description = "La obra cumbre de la literatura española y una de las más importantes de la literatura universal.",
                    PurchasePrice = 25.00m,
                    RentalPricePerDay = 3.50m,
                    StockPurchase = 6,
                    StockRental = 3,
                    ImageUrl = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400",
                    PublishedDate = DateTime.SpecifyKind(new DateTime(1605, 1, 16), DateTimeKind.Utc),
                    CategoryId = categories[6].Id, // Clásicos
                    AuthorId = authors[7].Id // Miguel de Cervantes
                },
                new Book
                {
                    Title = "El Principito",
                    ISBN = "9788478887194",
                    Description = "Un cuento poético que trata temas profundos como el sentido de la vida y la amistad.",
                    PurchasePrice = 12.99m,
                    RentalPricePerDay = 1.50m,
                    StockPurchase = 25,
                    StockRental = 12,
                    ImageUrl = "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400",
                    PublishedDate = DateTime.SpecifyKind(new DateTime(1943, 4, 6), DateTimeKind.Utc),
                    CategoryId = categories[6].Id, // Clásicos
                    AuthorId = authors[8].Id // Antoine de Saint-Exupéry
                },
                new Book
                {
                    Title = "Yo, Robot",
                    ISBN = "9788435006057",
                    Description = "Colección de relatos sobre robots y las tres leyes de la robótica.",
                    PurchasePrice = 14.50m,
                    RentalPricePerDay = 2.30m,
                    StockPurchase = 9,
                    StockRental = 4,
                    ImageUrl = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400",
                    PublishedDate = DateTime.SpecifyKind(new DateTime(1950, 12, 2), DateTimeKind.Utc),
                    CategoryId = categories[1].Id, // Ciencia Ficción
                    AuthorId = authors[3].Id // Isaac Asimov
                }
            };

            context.Books.AddRange(books);
            context.SaveChanges();
        }
    }
}
