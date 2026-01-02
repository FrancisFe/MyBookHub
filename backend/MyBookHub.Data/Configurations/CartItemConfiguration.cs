using MyBookHub.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace MyBookHub.Data.Configurations
{
    public class CartItemConfiguration : IEntityTypeConfiguration<CartItem>
    {
        public void Configure(EntityTypeBuilder<CartItem> builder)
        {
            builder.ToTable("cartitems");
            builder.HasKey(ci => ci.Id);

            builder.Property(ci => ci.Id)
                .ValueGeneratedOnAdd();

            builder.Property(ci => ci.CartId)
                .IsRequired();

            builder.Property(ci => ci.BookId)
                .IsRequired();

            builder.Property(ci => ci.Quantity)
                .IsRequired()
                .HasDefaultValue(1);

            builder.Property(ci => ci.Price)
                .HasPrecision(10, 2)
                .IsRequired();

            // Relaciones
            builder.HasOne(ci => ci.Cart)
                .WithMany(c => c.CartItems)
                .HasForeignKey(ci => ci.CartId)
                .OnDelete(DeleteBehavior.Cascade);

            builder.HasOne(ci => ci.Book)
                .WithMany()
                .HasForeignKey(ci => ci.BookId)
                .OnDelete(DeleteBehavior.Restrict);

            // Índices
            builder.HasIndex(ci => new { ci.CartId, ci.BookId , ci.Type })
                .IsUnique();


        }
    }
}
