using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace todoBackend.Migrations
{
    /// <inheritdoc />
    public partial class AddDefaultValueToStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "ToDos",
                type: "text",
                nullable: false,
                defaultValue: "todo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "ToDos");
        }
    }
}
