using BibliotecaDevlights.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace BibliotecaDevlights.Data.Configurations
{
    public class BookConfiguration : IEntityTypeConfiguration<Book>
    {
        public void Configure(EntityTypeBuilder<Book> builder)
        {

            builder.ToTable("Books");


            builder.HasKey(b => b.Id);


            builder.Property(b => b.Title)
                .IsRequired()
                .HasMaxLength(200);

            builder.Property(b => b.ISBN)
                .IsRequired()
                .HasMaxLength(13);

            builder.Property(b => b.Description)
                .HasMaxLength(2000);

            builder.Property(b => b.PurchasePrice)
                .HasPrecision(18, 2)
                .IsRequired();

            builder.Property(b => b.RentalPricePerDay)
                .HasPrecision(18, 2)
                .IsRequired();

            builder.Property(b => b.StockPurchase)
                .IsRequired()
                .HasDefaultValue(0);

            builder.Property(b => b.StockRental)
                .IsRequired()
                .HasDefaultValue(0);

            builder.Property(b => b.ImageUrl)
                .HasMaxLength(500);

            builder.HasIndex(b => b.ISBN)
                .IsUnique();

            builder.HasIndex(b => b.Title);



            builder.HasOne(b => b.Category)
                .WithMany(c => c.Books)
                .HasForeignKey(b => b.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(b => b.Author)
                .WithMany(a => a.Books)
                .HasForeignKey(b => b.AuthorId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
