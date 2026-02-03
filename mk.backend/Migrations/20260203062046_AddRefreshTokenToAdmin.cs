using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace mk.backend.Migrations
{
    /// <inheritdoc />
    public partial class AddRefreshTokenToAdmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RefreshToken",
                table: "Admin",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RefreshTokenExpiryTime",
                table: "Admin",
                type: "datetime2",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RefreshToken",
                table: "Admin");

            migrationBuilder.DropColumn(
                name: "RefreshTokenExpiryTime",
                table: "Admin");
        }
    }
}
