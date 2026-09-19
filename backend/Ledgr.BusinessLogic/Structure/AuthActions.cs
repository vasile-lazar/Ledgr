using Ledgr.DataAccess.Context;
using Ledgr.Domain.Entities.User;
using Ledgr.Domain.Enums;
using Ledgr.Domain.Models.Auth;
using Ledgr.Domain.Models.Service;
using Ledgr.BusinessLogic.Security;

namespace Ledgr.BusinessLogic.Structure;

public class AuthActions
{
    private readonly LedgrDbContext _context;
    private readonly string _pepper;

    protected AuthActions(LedgrDbContext context)
    {
        _context = context;
        _pepper = Environment.GetEnvironmentVariable("AUTH_PEPPER")
                  ?? throw new Exception("AUTH_PEPPER not configured.");
    }

    protected ServiceResponse RegisterAction(RegisterDto dto)
    {
        var exists = _context.Users.Any(u => u.Email == dto.Email);
        if (exists)
            return new ServiceResponse { IsSuccess = false, Message = "Email already taken." };

        if (dto.Password != dto.ConfirmPassword)
            return new ServiceResponse { IsSuccess = false, Message = "Passwords do not match." };

        var timestamp = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
        var salt = PasswordHasher.GenerateSalt();

        var tempEntity = new UserEntity
        {
            Username = dto.Username,
            Email = dto.Email,
            Salt = salt,
            CreatedAtTimestamp = timestamp,
            Status = StatusType.Active,
            PasswordHash = "temp"
        };

        try
        {
            _context.Users.Add(tempEntity);
            _context.SaveChanges();

            var hash = PasswordHasher.Hash(dto.Password, salt, _pepper, tempEntity.Id, timestamp);
            tempEntity.PasswordHash = hash;
            _context.SaveChanges();
        }
        catch (Exception e)
        {
            return new ServiceResponse { IsSuccess = false, Message = e.Message };
        }

        return new ServiceResponse { IsSuccess = true, Message = "Registration successful." };
    }

    protected ServiceResponse LoginAction(LoginDto dto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "Invalid credentials." };

        if (user.Status == StatusType.Suspended)
            return new ServiceResponse { IsSuccess = false, Message = "Account suspended." };

        var valid = PasswordHasher.Verify(
            dto.Password, user.PasswordHash, user.Salt, _pepper, user.Id, user.CreatedAtTimestamp
        );

        if (!valid)
            return new ServiceResponse { IsSuccess = false, Message = "Invalid credentials." };

        var token = JwtGenerator.Generate(user);

        return new ServiceResponse
        {
            IsSuccess = true,
            Data = new AuthResponseDto
            {
                Id = user.Id,
                Token = token,
                Username = user.Username,
                Email = user.Email,
            }
        };
    }
    
    protected ServiceResponse UpdateProfileAction(int userId, UpdateProfileDto dto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == userId);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User not found." };

        var emailTaken = _context.Users.Any(u => u.Email == dto.Email && u.Id != userId);
        if (emailTaken)
            return new ServiceResponse { IsSuccess = false, Message = "Email already in use." };

        user.Username = dto.Username;
        user.Email = dto.Email;
        _context.SaveChanges();

        return new ServiceResponse
        {
            IsSuccess = true,
            Data = new AuthResponseDto
            {
                Id = user.Id,
                Username = user.Username,
                Email = user.Email,
            }
        };
    }

    protected ServiceResponse ChangePasswordAction(int userId, ChangePasswordDto dto)
    {
        var user = _context.Users.FirstOrDefault(u => u.Id == userId);
        if (user == null)
            return new ServiceResponse { IsSuccess = false, Message = "User not found." };

        if (dto.NewPassword != dto.ConfirmNewPassword)
            return new ServiceResponse { IsSuccess = false, Message = "New passwords do not match." };

        var currentValid = PasswordHasher.Verify(
            dto.CurrentPassword, user.PasswordHash, user.Salt, _pepper, user.Id, user.CreatedAtTimestamp
        );
        if (!currentValid)
            return new ServiceResponse { IsSuccess = false, Message = "Current password is incorrect." };

        var newSalt = PasswordHasher.GenerateSalt();
        var newHash = PasswordHasher.Hash(dto.NewPassword, newSalt, _pepper, user.Id, user.CreatedAtTimestamp);

        user.Salt = newSalt;
        user.PasswordHash = newHash;
        _context.SaveChanges();

        return new ServiceResponse { IsSuccess = true, Message = "Password updated." };
    }
}