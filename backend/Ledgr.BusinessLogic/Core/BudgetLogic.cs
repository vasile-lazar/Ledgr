using Ledgr.BusinessLogic.Interfaces;
using Ledgr.BusinessLogic.Structure;
using Ledgr.DataAccess.Context;
using Ledgr.Domain.Models.Budget;
using Ledgr.Domain.Models.Service;

namespace Ledgr.BusinessLogic.Core;

public class BudgetLogic : BudgetActions, IBudgetLogic
{
    public BudgetLogic(LedgrDbContext context) : base(context) { }

    public ServiceResponse GetLastMonthBudgets(int userId)
    {
        return GetLastMonthBudgetsAction(userId);
    }

    public ServiceResponse CreateBudget(int userId, CreateBudgetDto dto)
    {
        return  CreateBudgetAction(userId, dto);
    }

    public ServiceResponse UpdateBudget(int userId, int budgetId, UpdateBudgetDto dto)
    {
        return UpdateBudgetAction(userId, budgetId, dto);
    }

    public ServiceResponse DeleteBudget(int userId, int budgetId)
    {
        return  DeleteBudgetAction(userId, budgetId);
    }
}