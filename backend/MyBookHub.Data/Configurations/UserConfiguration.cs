using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyBookHub.Data.Entities;
using MyBookHub.Data.Enums;

namespace MyBookHub.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("users");

            builder.HasKey(u => u.Id);

            builder.Property(u => u.Id)
                .ValueGeneratedOnAdd();

            builder.Property(u => u.UserName)
                .IsRequired()
                .HasMaxLength(100);

            builder.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(u => u.PasswordHash)
                .IsRequired()
                .HasMaxLength(255);

            builder.Property(u => u.Img)
                .IsRequired(false)
                .HasMaxLength(500);

            builder.Property(u => u.Role)
                .HasConversion<int>()
                .HasDefaultValue(UserRole.User);

            builder.Property(u => u.CreatedAt)
                .HasDefaultValueSql("NOW() AT TIME ZONE 'UTC'");

            builder.Property(u => u.UpdatedAt)
                .HasDefaultValueSql("NOW() AT TIME ZONE 'UTC'");

            builder.HasIndex(u => u.Email)
                .IsUnique();

            builder.HasIndex(u => u.UserName)
                .IsUnique();
        }
    }
}
