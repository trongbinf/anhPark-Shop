using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebGameV1.DataAcess.Migrations
{
    /// <inheritdoc />
    public partial class fixAttributeProduct : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EquipmentImageUrl",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "GemsImageUrl",
                table: "Products");

            migrationBuilder.RenameColumn(
                name: "InventoryImageUrl",
                table: "Products",
                newName: "MainImageUrl");

            migrationBuilder.RenameColumn(
                name: "ImageUrl",
                table: "Products",
                newName: "DetailImageUrl");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "MainImageUrl",
                table: "Products",
                newName: "InventoryImageUrl");

            migrationBuilder.RenameColumn(
                name: "DetailImageUrl",
                table: "Products",
                newName: "ImageUrl");

            migrationBuilder.AddColumn<string>(
                name: "EquipmentImageUrl",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "GemsImageUrl",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
