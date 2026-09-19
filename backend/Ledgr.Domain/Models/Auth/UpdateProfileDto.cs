namespace Ledgr.Domain.Models.Auth;


public class UpdateProfileDto
{
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
}