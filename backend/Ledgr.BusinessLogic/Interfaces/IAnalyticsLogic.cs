using Ledgr.Domain.Models.Service;

namespace Ledgr.BusinessLogic.Interfaces;

public interface IAnalyticsLogic
{
    public ServiceResponse GetLastSixMonthsIncome(int userId);
    public ServiceResponse GetLastSixMonthsExpense(int userId);
    public ServiceResponse GetExpenseByCategory(int userId);
}