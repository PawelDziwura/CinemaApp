using Microsoft.EntityFrameworkCore.Migrations;

namespace DB.Migrations
{
    public partial class UpdateSeanceModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Seances_Movies_SeanceMovieId",
                table: "Seances");

            migrationBuilder.DropIndex(
                name: "IX_Seances_SeanceMovieId",
                table: "Seances");

            migrationBuilder.AddColumn<int>(
                name: "MovieId",
                table: "Seances",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Seances_MovieId",
                table: "Seances",
                column: "MovieId");

            migrationBuilder.AddForeignKey(
                name: "FK_Seances_Movies_MovieId",
                table: "Seances",
                column: "MovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Seances_Movies_MovieId",
                table: "Seances");

            migrationBuilder.DropIndex(
                name: "IX_Seances_MovieId",
                table: "Seances");

            migrationBuilder.DropColumn(
                name: "MovieId",
                table: "Seances");

            migrationBuilder.CreateIndex(
                name: "IX_Seances_SeanceMovieId",
                table: "Seances",
                column: "SeanceMovieId");

            migrationBuilder.AddForeignKey(
                name: "FK_Seances_Movies_SeanceMovieId",
                table: "Seances",
                column: "SeanceMovieId",
                principalTable: "Movies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
