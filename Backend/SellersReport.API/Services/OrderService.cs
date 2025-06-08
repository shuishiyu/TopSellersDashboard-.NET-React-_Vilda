using SellersReport.API.Models;
using CsvHelper;
using CsvHelper.Configuration;
using System.Globalization;

namespace SellersReport.API.Services
{
    public class OrderService : IOrderService
    {
        private readonly List<Order> _orders;

        public OrderService()
        {
            _orders = LoadOrders();
        }

        private List<Order> LoadOrders()
        {
            using var reader = new StreamReader("orders.csv");

            var config = new CsvConfiguration(CultureInfo.InvariantCulture)
            {
                Delimiter = ",",  // Changed to comma delimiter
                HeaderValidated = null,
                MissingFieldFound = null
            };

            using var csv = new CsvReader(reader, config);
            csv.Context.RegisterClassMap<OrderMap>();  // Register mapping for date format parsing

            return csv.GetRecords<Order>().ToList();
        }

        public IEnumerable<string> GetAllBranches()
        {
            return _orders
                .Select(o => o.Branch)
                .Distinct()
                .OrderBy(b => b);
        }

        public IEnumerable<TopSellerDto> GetTopSellersByMonth(string branch)
        {
            return _orders
                .Where(o => o.Branch.Equals(branch, StringComparison.OrdinalIgnoreCase))
                .GroupBy(o => new { o.OrderDate.Month, o.Seller })
                .Select(g => new
                {
                    g.Key.Month,
                    g.Key.Seller,
                    TotalOrders = g.Count(),
                    TotalSales = g.Sum(o => o.Price)
                })
                .GroupBy(g => g.Month)
                .Select(g =>
                {
                    var topSeller = g.OrderByDescending(x => x.TotalSales).First();
                    return new TopSellerDto
                    {
                        Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(topSeller.Month),
                        Seller = topSeller.Seller,
                        TotalOrders = topSeller.TotalOrders,
                        TotalSales = topSeller.TotalSales
                    };
                })
                .OrderBy(r => DateTime.ParseExact(r.Month, "MMMM", CultureInfo.CurrentCulture).Month);
        }
    }

    // Add this mapping class below or in a separate file
    public class OrderMap : ClassMap<Order>
    {
        public OrderMap()
        {
            Map(m => m.Seller);
            Map(m => m.Product);
            Map(m => m.Price);
            Map(m => m.OrderDate).TypeConverterOption.Format("yyyy-MM-dd");  // Match date format in CSV
            Map(m => m.Branch);
        }
    }
}
