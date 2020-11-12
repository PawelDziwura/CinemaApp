using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace DB.Migrations
{
    public partial class Poster : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Poster",
                table: "Movies");

            migrationBuilder.AddColumn<int>(
                name: "PosterId",
                table: "Movies",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Poster",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Image = table.Column<byte[]>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Poster", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Movies_PosterId",
                table: "Movies",
                column: "PosterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Movies_Poster_PosterId",
                table: "Movies",
                column: "PosterId",
                principalTable: "Poster",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movies_Poster_PosterId",
                table: "Movies");

            migrationBuilder.DropTable(
                name: "Poster");

            migrationBuilder.DropIndex(
                name: "IX_Movies_PosterId",
                table: "Movies");

            migrationBuilder.DropColumn(
                name: "PosterId",
                table: "Movies");

            migrationBuilder.AddColumn<string>(
                name: "Poster",
                table: "Movies",
                type: "text",
                nullable: true);
        }
    }
}
