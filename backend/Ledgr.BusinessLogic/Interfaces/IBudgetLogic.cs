using Ledgr.Domain.Models.Budget;
using Ledgr.Domain.Models.Service;

namespace Ledgr.BusinessLogic.Interfaces;

public interface IBudgetLogic
{
    public ServiceResponse GetLastMonthBudgets(int userId);
    public ServiceResponse CreateBudget(int userId, CreateBudgetDto dto);
    public ServiceResponse UpdateBudget(int userId, int budgetId, UpdateBudgetDto dto);
    public ServiceResponse DeleteBudget(int userId, int budgetId);
}