using System.Security.Claims;
using Ledgr.BusinessLogic.Interfaces;
using Ledgr.Domain.Models.Statement;
using Ledgr.Domain.Models.Transaction;
using Microsoft.AspNetCore.Mvc;

namespace Ledgr.Api.Controllers;

[ApiController]
[Route("api/statements")]
public class StatementController : ControllerBase
{
    private readonly IStatementLogic _statementLogic;

    public StatementController(BusinessLogic.BusinessLogic businessLogic)
    {
        _statementLogic = businessLogic.GetStatementLogic();
    }
    
    private int CurrentUserId =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpPost("upload/text")]
    public async Task<IActionResult> Upload([FromBody] UploadStatementDto dto)
    {
        var response = await _statementLogic.Upload(CurrentUserId, dto.StatementText);

        if (!response.IsSuccess)
            return BadRequest(response.Message);

        return Ok(response.Data);
    }

    [HttpPost("upload/pdf")]
    public async Task<IActionResult> UploadStatement(IFormFile file)
    {
        var response = await _statementLogic.UploadStatement(CurrentUserId, file);

        if (!response.IsSuccess)
            return BadRequest(response.Message);

        return Ok(response.Data);
    }

    [HttpPost("accept")]
    public IActionResult Accept([FromBody] SaveTransactionsDto dto)
    {
        var response = _statementLogic.Accept(CurrentUserId, dto);

        if (!response.IsSuccess)
            return BadRequest(response.Message);

        return Ok(response.Data);
    }

    [HttpGet]
    public IActionResult GetStatements()
    {
        var response = _statementLogic.GetStatements(CurrentUserId);
        
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        
        return Ok(response.Data);
    }
}