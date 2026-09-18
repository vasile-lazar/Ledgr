using Ledgr.BusinessLogic.Interfaces;
using Ledgr.BusinessLogic.Structure;
using Ledgr.DataAccess.Context;
using Ledgr.Domain.Models.Service;

namespace Ledgr.BusinessLogic.Core;

public class AnalyticsLogic : AnalyticsActions, IAnalyticsLogic
{
    public AnalyticsLogic(LedgrDbContext context) : base(context) { }
    
    public ServiceResponse GetLastSixMonthsIncome(int userId)
    {
        return GetLastSixMonthsIncomeAction(userId);
    }

    public ServiceResponse GetLastSixMonthsExpense(int userId)
    {
        return GetLastSixMonthsExpenseAction(userId);
    }

    public ServiceResponse GetExpenseByCategory(int userId)
    {
        return  GetExpenseByCategoryAction(userId);
    }
}