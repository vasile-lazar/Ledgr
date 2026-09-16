using Ledgr.Domain.Models.Auth;
using Ledgr.Domain.Models.Service;

namespace Ledgr.BusinessLogic.Interfaces;

public interface IAuthLogic
{
    ServiceResponse Register(RegisterDto dto);
    ServiceResponse Login(LoginDto dto);
}