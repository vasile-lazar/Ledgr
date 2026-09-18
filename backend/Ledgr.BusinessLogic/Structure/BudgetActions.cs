using Ledgr.DataAccess.Context;
using Ledgr.Domain.Entities.Budget;
using Ledgr.Domain.Models.Budget;
using Ledgr.Domain.Models.Service;

namespace Ledgr.BusinessLogic.Structure;

public class BudgetActions
{
    private readonly LedgrDbContext _context;

    protected BudgetActions(LedgrDbContext context)
    {
        _context = context;
    }

    protected ServiceResponse GetLastMonthBudgetsAction(int userId)
    {
        var startOfMonth = new DateOnly(DateTime.UtcNow.Year, DateTime.UtcNow.Month, 1);

        var items = _context.Budgets
            .Where(e => e.UserId == userId)
            .Where(e => e.Date >= startOfMonth)
            .Select(e => new BudgetDto
            {
                Id = e.Id,
                Category = e.Category,
                Amount = e.Amount,
                Used = e.Used,
                Date = e.Date
            }).ToList();

        return new ServiceResponse { IsSuccess = true, Data = items };
    }

    protected ServiceResponse CreateBudgetAction(int userId, CreateBudgetDto dto)
    {
        var now = DateTime.UtcNow;
        var monthStart = new DateOnly(now.Year, now.Month, 1);

        var exists = _context.Budgets.Any(e =>
            e.UserId == userId &&
            e.Category == dto.Category &&
            e.Date == monthStart);

        if (exists)
            return new ServiceResponse { IsSuccess = false, Message = "A budget for this category and month already exists." };

        var budget = new BudgetEntity
        {
            UserId = userId,
            Category = dto.Category,
            Amount = dto.Amount,
            Used = 0,
            Date = monthStart
        };

        _context.Budgets.Add(budget);
        _context.SaveChanges();

        return new ServiceResponse { IsSuccess = true, Message = "Budget created." };
    }

    protected ServiceResponse UpdateBudgetAction(int userId, int budgetId, UpdateBudgetDto dto)
    {
        var budget = _context.Budgets
            .FirstOrDefault(e => e.Id == budgetId && e.UserId == userId);

        if (budget == null)
            return new ServiceResponse { IsSuccess = false, Message = "Budget not found." };
        
        budget.Amount = dto.Amount;
        _context.SaveChanges();

        return new ServiceResponse { IsSuccess = true, Message = "Budget updated." };
    }

    protected ServiceResponse DeleteBudgetAction(int userId, int budgetId)
    {
        var budget = _context.Budgets
            .FirstOrDefault(e => e.Id == budgetId && e.UserId == userId);

        if (budget == null)
            return new ServiceResponse { IsSuccess = false, Message = "Budget not found." };

        _context.Budgets.Remove(budget);
        _context.SaveChanges();

        return new ServiceResponse { IsSuccess = true, Message = "Budget deleted." };
    }
}