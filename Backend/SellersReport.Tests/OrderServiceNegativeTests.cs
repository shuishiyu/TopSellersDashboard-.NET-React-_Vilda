using System;
using System.IO;
using Xunit;
using SellersReport.API.Services;
using CsvHelper;

namespace SellersReport.Tests;

public class OrderServiceNegativeTests : IDisposable
{
    private const string TestFileName = "test_orders.csv";
    private const string ProductionFileName = "orders.csv";
    private bool _hadOriginalFile;

    public OrderServiceNegativeTests()
    {
        // Backup original file if exists
        _hadOriginalFile = File.Exists(ProductionFileName);
        if (_hadOriginalFile)
        {
            File.Copy(ProductionFileName, $"{ProductionFileName}.backup", true);
        }
    }

    [Fact]
    public void GetTopSellers_NonExistentBranch_ReturnsEmpty()
    {
        // Arrange - Create minimal valid CSV
        File.WriteAllText(ProductionFileName,
            "Seller,Product,Price,OrderDate,Branch\n" +
            "John Doe,Product A,100.00,2024-01-15,Branch 1");

        var service = new OrderService();

        // Act
        var result = service.GetTopSellersByMonth("NonExistent_Branch");

        // Assert
        Assert.Empty(result);
    }

    [Fact]
    public void LoadOrders_MissingRequiredColumns_ThrowsReaderException()
    {
        // Arrange - Create CSV with wrong headers
        File.WriteAllText(ProductionFileName,
            "Wrong,Column,Headers\n" +
            "Value1,Value2,Value3");

        // Act & Assert
        var ex = Assert.Throws<CsvHelper.ReaderException>(() => new OrderService());
        Assert.Contains("No members are mapped", ex.Message);
    }

    [Fact]
    public void LoadOrders_EmptyFile_ThrowsFileNotFoundException()
    {
        // Arrange
        if (File.Exists(ProductionFileName))
            File.Delete(ProductionFileName);

        // Act & Assert
        Assert.Throws<FileNotFoundException>(() => new OrderService());
    }

    public void Dispose()
    {
        // Cleanup
        if (File.Exists(ProductionFileName))
            File.Delete(ProductionFileName);

        // Restore original
        if (_hadOriginalFile && File.Exists($"{ProductionFileName}.backup"))
            File.Move($"{ProductionFileName}.backup", ProductionFileName, true);
    }
}