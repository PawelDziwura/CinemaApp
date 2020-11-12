using Microsoft.EntityFrameworkCore.Migrations;

namespace DB.Migrations
{
    public partial class OrderModelUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_UserId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "OrderUserId",
                table: "Orders",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_OrderUserId",
                table: "Orders",
                column: "OrderUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_OrderUserId",
                table: "Orders",
                column: "OrderUserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Users_OrderUserId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_OrderUserId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "OrderUserId",
                table: "Orders");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Orders",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_UserId",
                table: "Orders",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Users_UserId",
                table: "Orders",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
