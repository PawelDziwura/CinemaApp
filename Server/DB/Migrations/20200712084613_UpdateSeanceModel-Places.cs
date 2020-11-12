using Microsoft.EntityFrameworkCore.Migrations;

namespace DB.Migrations
{
    public partial class UpdateSeanceModelPlaces : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SeanceId",
                table: "Places",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Places_SeanceId",
                table: "Places",
                column: "SeanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Places_Seances_SeanceId",
                table: "Places",
                column: "SeanceId",
                principalTable: "Seances",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Places_Seances_SeanceId",
                table: "Places");

            migrationBuilder.DropIndex(
                name: "IX_Places_SeanceId",
                table: "Places");

            migrationBuilder.DropColumn(
                name: "SeanceId",
                table: "Places");
        }
    }
}
