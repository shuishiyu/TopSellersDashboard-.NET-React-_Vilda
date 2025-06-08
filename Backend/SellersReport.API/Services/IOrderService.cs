
using SellersReport.API.Models;

namespace SellersReport.API.Services
{
    public interface IOrderService
    {
        IEnumerable<string> GetAllBranches();
        IEnumerable<TopSellerDto> GetTopSellersByMonth(string branch);
    }
}
