using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Ledgr.Domain.Entities.User;
using Microsoft.IdentityModel.Tokens;

namespace Ledgr.BusinessLogic.Security;

public static class JwtGenerator
{
    public static string Generate(UserEntity user)
    {
        var secret = Environment.GetEnvironmentVariable("JWT_SECRET")
                     ?? throw new Exception("JWT_SECRET not configured.");
        var issuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "ledgr";
        var audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "ledgr";
        var expiry = int.Parse(Environment.GetEnvironmentVariable("JWT_EXPIRY_MINUTES") ?? "60");

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Email, user.Email),
        };

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(expiry),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}