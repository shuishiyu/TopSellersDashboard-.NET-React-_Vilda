namespace SellersReport.API.Models;

public class Order
{
    public required string Seller { get; set; }
    public required string Product { get; set; }
    public decimal Price { get; set; }
    public DateTime OrderDate { get; set; }
    public required string Branch { get; set; }
}

