using Microsoft.AspNetCore.Mvc;
using SellersReport.API.Services;

namespace SellersReport.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ReportsController : ControllerBase
{
    private readonly IOrderService _orderService;

    public ReportsController(IOrderService orderService)
    {
        _orderService = orderService;
    }

    [HttpGet("branches")]
    public IActionResult GetBranches()
    {
        var branches = _orderService.GetAllBranches();
        return Ok(branches);
    }

    [HttpGet("top-sellers")]
    public IActionResult GetTopSellers([FromQuery] string branch)
    {
        if (string.IsNullOrWhiteSpace(branch))
            return BadRequest("Branch is required.");

        var data = _orderService.GetTopSellersByMonth(branch);
        return Ok(data);
    }
}

