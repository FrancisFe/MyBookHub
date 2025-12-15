using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BibliotecaDevlights.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedTypeCart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CartItems_CartId_BookId",
                table: "CartItems");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_CartId_BookId_Type",
                table: "CartItems",
                columns: new[] { "CartId", "BookId", "Type" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_CartItems_CartId_BookId_Type",
                table: "CartItems");

            migrationBuilder.CreateIndex(
                name: "IX_CartItems_CartId_BookId",
                table: "CartItems",
                columns: new[] { "CartId", "BookId" },
                unique: true);
        }
    }
}
