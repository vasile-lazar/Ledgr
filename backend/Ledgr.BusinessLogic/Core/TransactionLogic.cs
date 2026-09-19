using Ledgr.BusinessLogic.Interfaces;
using Ledgr.BusinessLogic.Structure;
using Ledgr.DataAccess.Context;
using Ledgr.Domain.Models.Service;

namespace Ledgr.BusinessLogic.Core;

public class TransactionLogic : TransactionActions, ITransactionLogic
{
    public TransactionLogic(LedgrDbContext context) : base(context) { }

    public ServiceResponse GetTransactions(int userId)
    {
        return GetTransactionsAction(userId);
    }
}