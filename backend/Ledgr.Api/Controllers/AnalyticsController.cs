using System.Security.Claims;
using Ledgr.BusinessLogic.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Ledgr.Api.Controllers;

[ApiController]
[Route("api/analytics")]
public class AnalyticsController : ControllerBase
{
    private readonly IAnalyticsLogic _analyticsLogic;

    public AnalyticsController(BusinessLogic.BusinessLogic businessLogic)
    {
        _analyticsLogic = businessLogic.GetAnalyticsLogic();
    }

    private int CurrentUserId =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet("income")]
    public IActionResult GetLastSixMonthsIncome()
    {
        var response = _analyticsLogic.GetLastSixMonthsIncome(CurrentUserId);
        
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        
        return Ok(response.Data);
    }
    
    [HttpGet("expense")]
    public IActionResult GetLastSixMonthsExpense()
    {
        var response = _analyticsLogic.GetLastSixMonthsExpense(CurrentUserId);
        
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        
        return Ok(response.Data);
    }

    [HttpGet("category")]
    public IActionResult GetExpenseByCategory()
    {
        var response = _analyticsLogic.GetExpenseByCategory(CurrentUserId);
        
        if(!response.IsSuccess)
            return BadRequest(response.Message);
        
        return Ok(response.Data);
    }
}