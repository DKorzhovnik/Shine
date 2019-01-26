﻿using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Shine.Data.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CategoryName = table.Column<string>(maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    CountryId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ContinentName = table.Column<string>(nullable: true),
                    ContinentCode = table.Column<string>(nullable: true),
                    CountryName = table.Column<string>(nullable: true),
                    TwoLetterCountryCode = table.Column<string>(nullable: true),
                    ThreeLetterCountryCode = table.Column<string>(nullable: true),
                    CountryNumber = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.CountryId);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    ProductId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: false),
                    Specification = table.Column<string>(nullable: true),
                    Price = table.Column<decimal>(nullable: false),
                    ProductType = table.Column<bool>(nullable: false),
                    CategoryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.ProductId);
                    table.ForeignKey(
                        name: "FK_Products_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Peoples",
                columns: table => new
                {
                    PeopleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Gender = table.Column<string>(maxLength: 5, nullable: false),
                    FirstName = table.Column<string>(maxLength: 50, nullable: false),
                    LastName = table.Column<string>(maxLength: 50, nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "date", nullable: false),
                    Email = table.Column<string>(maxLength: 50, nullable: true),
                    Telephone = table.Column<string>(nullable: true),
                    Fax = table.Column<string>(nullable: true),
                    PeopleType = table.Column<int>(nullable: false),
                    CountryId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Peoples", x => x.PeopleId);
                    table.ForeignKey(
                        name: "FK_Peoples_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "CountryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Invoices",
                columns: table => new
                {
                    InvoiceId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    InvoiceNumber = table.Column<string>(maxLength: 50, nullable: false),
                    DateOfIssue = table.Column<DateTime>(type: "date", nullable: false),
                    PaymentDateOne = table.Column<DateTime>(type: "date", nullable: false),
                    PaymentOne = table.Column<decimal>(nullable: false),
                    PaymentDateTwo = table.Column<DateTime>(type: "date", nullable: false),
                    PaymentTwo = table.Column<decimal>(nullable: false),
                    TimeForPayment = table.Column<DateTime>(type: "date", nullable: false),
                    InvoiceType = table.Column<bool>(nullable: false),
                    PeopleId = table.Column<int>(nullable: false),
                    LocalInvoiceNumber = table.Column<string>(maxLength: 50, nullable: true),
                    LocalDateOfIssue = table.Column<DateTime>(type: "date", nullable: true),
                    Currency = table.Column<string>(maxLength: 10, nullable: true),
                    RateOne = table.Column<decimal>(type: "decimal(7,2)", nullable: true),
                    RateTwo = table.Column<decimal>(type: "decimal(7,2)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoices", x => x.InvoiceId);
                    table.ForeignKey(
                        name: "FK_Invoices_Peoples_PeopleId",
                        column: x => x.PeopleId,
                        principalTable: "Peoples",
                        principalColumn: "PeopleId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PeopleProducts",
                columns: table => new
                {
                    PeopleId = table.Column<int>(nullable: false),
                    ProductId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeopleProducts", x => new { x.PeopleId, x.ProductId });
                    table.ForeignKey(
                        name: "FK_PeopleProducts_Peoples_PeopleId",
                        column: x => x.PeopleId,
                        principalTable: "Peoples",
                        principalColumn: "PeopleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PeopleProducts_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Costs",
                columns: table => new
                {
                    CostId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(maxLength: 100, nullable: false),
                    Value = table.Column<decimal>(nullable: false),
                    InvoiceId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Costs", x => x.CostId);
                    table.ForeignKey(
                        name: "FK_Costs_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "InvoiceId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductInvoices",
                columns: table => new
                {
                    ProductId = table.Column<int>(nullable: false),
                    InvoiceId = table.Column<int>(nullable: false),
                    Specification = table.Column<string>(nullable: true),
                    Quantity = table.Column<decimal>(nullable: false),
                    Price = table.Column<decimal>(nullable: false),
                    Tax = table.Column<decimal>(nullable: false),
                    ProductInvoiceType = table.Column<int>(nullable: false),
                    Rate = table.Column<decimal>(nullable: true),
                    Unit = table.Column<string>(nullable: true),
                    LocalQuantity = table.Column<decimal>(nullable: true),
                    LocalPrice = table.Column<decimal>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductInvoices", x => new { x.ProductId, x.InvoiceId });
                    table.ForeignKey(
                        name: "FK_ProductInvoices_Invoices_InvoiceId",
                        column: x => x.InvoiceId,
                        principalTable: "Invoices",
                        principalColumn: "InvoiceId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProductInvoices_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "ProductId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Costs_InvoiceId",
                table: "Costs",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_InvoiceNumber",
                table: "Invoices",
                column: "InvoiceNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invoices_PeopleId",
                table: "Invoices",
                column: "PeopleId");

            migrationBuilder.CreateIndex(
                name: "IX_PeopleProducts_ProductId",
                table: "PeopleProducts",
                column: "ProductId");

            migrationBuilder.CreateIndex(
                name: "IX_Peoples_CountryId",
                table: "Peoples",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProductInvoices_InvoiceId",
                table: "ProductInvoices",
                column: "InvoiceId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_CategoryId",
                table: "Products",
                column: "CategoryId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Costs");

            migrationBuilder.DropTable(
                name: "PeopleProducts");

            migrationBuilder.DropTable(
                name: "ProductInvoices");

            migrationBuilder.DropTable(
                name: "Invoices");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Peoples");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Countries");
        }
    }
}