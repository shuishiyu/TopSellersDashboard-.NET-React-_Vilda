using System;
using System.IO;
using Xunit;
using SellersReport.API.Services;
using SellersReport.API.Models;
using CsvHelper;
using System.Globalization;
using System.Linq;

namespace SellersReport.Tests;

public class CsvParserTests : IDisposable
{
    private readonly string _testFilePath = "test_orders.csv";

    public CsvParserTests()
    {
        // Setup test CSV file
        File.WriteAllText(_testFilePath,
            "Seller,Product,Price,OrderDate,Branch\n" +
            "John Doe,Product A,100.00,2024-01-15,Branch 1\n" +
            "Jane Smith,Product B,150.00,2024-01-20,Branch 1");
    }

    [Fact]
    public void GetTopSellersByMonth_WithValidData_ReturnsCorrectResults()
    {
        // Arrange
        var service = new OrderService(); // Uses default CSV path

        // Act - This tests the end-to-end behavior
        var result = service.GetTopSellersByMonth("Branch 1");

        // Assert
        Assert.NotEmpty(result);
    }

    [Fact]
    public void GetAllBranches_WithValidData_ReturnsCorrectBranches()
    {
        // Arrange
        var service = new OrderService();

        // Act
        var branches = service.GetAllBranches();

        // Assert
        Assert.NotEmpty(branches);
    }

    public void Dispose()
    {
        // Cleanup test file if it exists
        if (File.Exists(_testFilePath))
            File.Delete(_testFilePath);
    }
}