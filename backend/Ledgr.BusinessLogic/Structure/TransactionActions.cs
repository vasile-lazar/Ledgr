using Ledgr.DataAccess.Context;
using Ledgr.Domain.Models.Service;
using Ledgr.Domain.Models.Transaction;

namespace Ledgr.BusinessLogic.Structure;

public class TransactionActions
{
    private readonly LedgrDbContext _context;

    protected TransactionActions(LedgrDbContext context)
    {
        _context = context;
    }

    protected ServiceResponse GetTransactionsAction(int userId)
    {
        var items = _context.Transactions
            .Where(e => e.UserId == userId)
            .OrderByDescending(e => e.Date)
            .Select(e => new ParsedTransactionDto
            {
                Date = e.Date,
                Merchant = e.Merchant,
                Amount = e.Amount,
                Category = e.Category,
            }).ToList();
        
        return new ServiceResponse { IsSuccess = true, Data = items };
    }
}