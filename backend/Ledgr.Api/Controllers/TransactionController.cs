using System.Security.Claims;
using Ledgr.BusinessLogic.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Ledgr.Api.Controllers;

[ApiController]
[Route("api/transactions")]
public class TransactionController : ControllerBase
{
    private readonly ITransactionLogic _transactionLogic;

    public TransactionController(BusinessLogic.BusinessLogic businessLogic)
    {
        _transactionLogic = businessLogic.GetTransactionLogic();
    }
    
    private int CurrentUserId = 2;
    // private int CurrentUserId =>
    //     int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    
    [HttpGet]
    public IActionResult GetTransactions()
    {
        var response = _transactionLogic.GetTransactions(CurrentUserId);
        
        if (!response.IsSuccess) 
            return BadRequest(response.Message);
        
        return Ok(response.Data);
    }
}