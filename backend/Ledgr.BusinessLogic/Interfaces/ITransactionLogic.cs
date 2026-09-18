using Ledgr.Domain.Models.Service;

namespace Ledgr.BusinessLogic.Interfaces;

public interface ITransactionLogic
{
    public ServiceResponse GetTransactions(int userId);
}