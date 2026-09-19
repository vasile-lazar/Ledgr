using Ledgr.BusinessLogic.Interfaces;
using Ledgr.BusinessLogic.Structure;
using Ledgr.Domain.Models.Auth;
using Ledgr.Domain.Models.Service;

namespace Ledgr.BusinessLogic.Core;

public class AuthLogic : AuthActions, IAuthLogic
{
    public AuthLogic(DataAccess.Context.LedgrDbContext context) : base(context) { }

    public ServiceResponse Register(RegisterDto dto) => RegisterAction(dto);
    public ServiceResponse Login(LoginDto dto) => LoginAction(dto);
    public ServiceResponse UpdateProfile(int userId, UpdateProfileDto dto)
    {
        return UpdateProfileAction(userId, dto);
    }

    public ServiceResponse ChangePassword(int userId, ChangePasswordDto dto)
    {
        return ChangePasswordAction(userId, dto);
    }
}