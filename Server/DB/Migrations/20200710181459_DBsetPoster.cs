using Microsoft.EntityFrameworkCore.Migrations;

namespace DB.Migrations
{
    public partial class DBsetPoster : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Poster_PosterId",
                table: "Movies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Poster",
                table: "Poster");

            migrationBuilder.RenameTable(
                name: "Poster",
                newName: "Posters");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Posters",
                table: "Posters",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Posters_PosterId",
                table: "Movies",
                column: "PosterId",
                principalTable: "Posters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Posters_PosterId",
                table: "Movies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Posters",
                table: "Posters");

            migrationBuilder.RenameTable(
                name: "Posters",
                newName: "Poster");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Poster",
                table: "Poster",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Poster_PosterId",
                table: "Movies",
                column: "PosterId",
                principalTable: "Poster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
