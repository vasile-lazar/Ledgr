using System.Security.Claims;
using Ledgr.BusinessLogic.Interfaces;
using Ledgr.Domain.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Ledgr.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthLogic _authLogic;

    public AuthController(BusinessLogic.BusinessLogic businessLogic)
    {
        _authLogic = businessLogic.GetAuthLogic();
    }
    
    private int CurrentUserId =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    
    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterDto dto)
    {
        var response = _authLogic.Register(dto);
        if (!response.IsSuccess)
            return BadRequest(response.Message);

        return Ok(response.Message);
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginDto dto)
    {
        var response = _authLogic.Login(dto);
        if (!response.IsSuccess)
            return Unauthorized(response.Message);

        return Ok(response.Data);
    }
    
    [Authorize]
    [HttpPut("profile")]
    public IActionResult UpdateProfile([FromBody] UpdateProfileDto dto)
    {
        var response = _authLogic.UpdateProfile(CurrentUserId, dto);
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        return Ok(response.Data);
    }

    [HttpPost("change-password")]
    [Authorize]
    public IActionResult ChangePassword([FromBody] ChangePasswordDto dto)
    {
        var response = _authLogic.ChangePassword(CurrentUserId, dto);
        if (!response.IsSuccess)
            return BadRequest(response.Message);
        return Ok(response.Message);
    }
}