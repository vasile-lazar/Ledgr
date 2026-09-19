namespace Ledgr.Domain.Models.Analytics;

public class MonthlyIncomeExpenseDto
{
    public int Year { get; set; }
    public int Month { get; set; } 
    public decimal Value { get; set; }
}