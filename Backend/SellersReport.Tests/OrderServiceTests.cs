using System;
using System.IO;
using System.Linq;
using Xunit;
using SellersReport.API.Services;

namespace SellersReport.Tests;

public class OrderServiceTests : IDisposable
{
    private const string TestFileName = "test_orders.csv";
    private const string ProductionFileName = "orders.csv";
    private bool _hadOriginalFile;

    public OrderServiceTests()
    {
        // Create test data that clearly shows who should be top seller
        File.WriteAllText(TestFileName,
            "Seller,Product,Price,OrderDate,Branch\n" +
            "John Doe,Product A,200.00,2024-01-15,Branch 1\n" +
            "John Doe,Product C,50.00,2024-01-18,Branch 1\n" +    // John's total: $250
            "Jane Smith,Product B,300.00,2024-01-20,Branch 1\n" + // Jane's total: $300 (should win)
            "Mike Brown,Product D,150.00,2024-02-05,Branch 1");   // Only February entry

        // Backup original file if exists
        _hadOriginalFile = File.Exists(ProductionFileName);
        if (_hadOriginalFile)
        {
            File.Copy(ProductionFileName, $"{ProductionFileName}.backup", true);
        }

        // Use our test file
        File.Copy(TestFileName, ProductionFileName, true);
    }

    [Fact]
    public void GetTopSellers_ValidBranch_ReturnsSellerWithHighestSalesPerMonth()
    {
        // Arrange
        var service = new OrderService();
        var branch = "Branch 1";

        // Act
        var result = service.GetTopSellersByMonth(branch).ToList();

        // Assert - Verify January
        var january = result.First(x => x.Month == "January");
        Assert.Equal("Jane Smith", january.Seller); // $300 > $250
        Assert.Equal(300.00m, january.TotalSales);
        Assert.Equal(1, january.TotalOrders);

        // Verify February
        var february = result.First(x => x.Month == "February");
        Assert.Equal("Mike Brown", february.Seller); // Only seller
        Assert.Equal(150.00m, february.TotalSales);
        Assert.Equal(1, february.TotalOrders);
    }

    public void Dispose()
    {
        // Clean up test file
        if (File.Exists(ProductionFileName))
        {
            File.Delete(ProductionFileName);
        }

        // Restore original if it existed
        if (_hadOriginalFile)
        {
            File.Move($"{ProductionFileName}.backup", ProductionFileName, true);
        }
    }
}