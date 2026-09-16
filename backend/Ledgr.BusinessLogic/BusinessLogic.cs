using Ledgr.BusinessLogic.Core;
using Ledgr.BusinessLogic.Interfaces;
using Ledgr.DataAccess.Context;

namespace Ledgr.BusinessLogic;

public class BusinessLogic
{
    private readonly LedgrDbContext _context;
    private readonly HttpClient _httpClient;

    public BusinessLogic(LedgrDbContext context, HttpClient httpClient)
    {
        _context = context;
        _httpClient = httpClient;
    }

    public IAuthLogic GetAuthLogic()
    {
        return new AuthLogic(_context);
    }
}