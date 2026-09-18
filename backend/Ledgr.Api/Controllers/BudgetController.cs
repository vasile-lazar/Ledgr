using System.Security.Claims;
using Ledgr.BusinessLogic.Interfaces;
using Ledgr.Domain.Models.Budget;
using Microsoft.AspNetCore.Mvc;

namespace Ledgr.Api.Controllers;

[ApiController]
[Route("api/budget")]
public class BudgetController : ControllerBase
{
    private readonly IBudgetLogic _budgetLogic;

    public BudgetController(BusinessLogic.BusinessLogic businessLogic)
    {
        _budgetLogic = businessLogic.GetBudgetLogic();
    }
    
    private int CurrentUserId = 2;
    // private int CurrentUserId =>
    //     int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public IActionResult GetLastMonthBudgets()
    {
        var response = _budgetLogic.GetLastMonthBudgets(CurrentUserId);
        
        if(!response.IsSuccess)
            return BadRequest(response.Message);
        
        return Ok(response.Data);
    }

    [HttpPost("create")]
    public IActionResult CreateBudget([FromBody] CreateBudgetDto dto)
    {
        var response = _budgetLogic.CreateBudget(CurrentUserId, dto);
        
        if(!response.IsSuccess)
            return BadRequest(response.Message);
        
        return Ok(response.Data);
    }

    [HttpPatch("update/{id}")]
    public IActionResult UpdateBudget([FromRoute] int id, [FromBody] UpdateBudgetDto dto)
    {
        var response = _budgetLogic.UpdateBudget(CurrentUserId, id, dto);

        if (!response.IsSuccess)
            return response.Message == "Budget not found."
                ? NotFound(response.Message)
                : BadRequest(response.Message);

        return Ok(response.Data);
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteBudget([FromRoute] int id)
    {
        var response = _budgetLogic.DeleteBudget(CurrentUserId, id);
        
        if(!response.IsSuccess)
            return response.Message == "Budget not found."
                ? NotFound(response.Message)
                : BadRequest(response.Message);
        
        return Ok(response.Data);
    }
}