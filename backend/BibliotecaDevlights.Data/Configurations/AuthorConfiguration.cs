using BibliotecaDevlights.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BibliotecaDevlights.Data.Configurations
{
    public class AuthorConfiguration : IEntityTypeConfiguration<Author>
    {
        public void Configure(EntityTypeBuilder<Author> builder)
        {
            builder.ToTable("Authors");
            builder.HasKey(a => a.Id);
            builder.Property(a => a.FirstName)
                   .IsRequired()
                   .HasMaxLength(100);
            builder.Property(a => a.LastName)
                     .IsRequired()
                     .HasMaxLength(100);
            builder.Property(a => a.Biography)
                        .HasMaxLength(2000);

            builder.Ignore(a => a.FullName);

            // Índices
            builder.HasIndex(a => new { a.FirstName, a.LastName });

            // Relaciones
            builder.HasMany(a => a.Books)
                .WithOne(b => b.Author)
                .HasForeignKey(b => b.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
