using Microsoft.EntityFrameworkCore.Migrations;

namespace DB.Migrations
{
    public partial class UpdateMoviesTableType : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "DurationTime",
                table: "Movies",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "DurationTime",
                table: "Movies",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string));
        }
    }
}
