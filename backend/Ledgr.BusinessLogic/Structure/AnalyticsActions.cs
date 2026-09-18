using Ledgr.DataAccess.Context;
using Ledgr.Domain.Models.Analytics;
using Ledgr.Domain.Models.Service;

namespace Ledgr.BusinessLogic.Structure;

public class AnalyticsActions
{
    private readonly LedgrDbContext _context;

    protected AnalyticsActions(LedgrDbContext context)
    {
        _context = context;
    }
    
    protected ServiceResponse GetLastSixMonthsIncomeAction(int userId)
    {
        var cutoff = DateOnly.FromDateTime(DateTime.UtcNow.AddMonths(-6));

        var items = _context.Transactions
            .Where(t => t.UserId == userId && t.Amount > 0 && t.Date >= cutoff)
            .GroupBy(t => new { t.Date.Year, t.Date.Month })
            .Select(g => new MonthlyIncomeExpenseDto
            {
                Year = g.Key.Year,
                Month = g.Key.Month,
                Value = g.Sum(t => t.Amount)
            })
            .OrderBy(x => x.Year).ThenBy(x => x.Month)
            .ToList();

        return new ServiceResponse { IsSuccess = true, Data = items };
    }

    protected ServiceResponse GetLastSixMonthsExpenseAction(int userId)
    {
        var cutoff = DateOnly.FromDateTime(DateTime.UtcNow.AddMonths(-6));

        var items = _context.Transactions
            .Where(t => t.UserId == userId && t.Amount < 0 && t.Date >= cutoff)
            .GroupBy(t => new { t.Date.Year, t.Date.Month })
            .Select(g => new MonthlyIncomeExpenseDto
            {
                Year = g.Key.Year,
                Month = g.Key.Month,
                Value = -g.Sum(t => t.Amount)
            })
            .OrderBy(x => x.Year).ThenBy(x => x.Month)
            .ToList();

        return new ServiceResponse { IsSuccess = true, Data = items };
    }

    protected ServiceResponse GetExpenseByCategoryAction(int userId)
    {
        var items = _context.Transactions
            .Where(t => t.UserId == userId && t.Amount < 0)
            .GroupBy(t => t.Category)
            .Select(g => new CategoryExpenseDto
            {
                Category = g.Key,
                Expense = -g.Sum(t => t.Amount)
            })
            .ToList();

        return new ServiceResponse { IsSuccess = true, Data = items };
    }
}