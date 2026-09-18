using Ledgr.Domain.Enums;

namespace Ledgr.Domain.Models.Analytics;

public class CategoryExpenseDto
{
    public TransactionType Category { get; set; }
    public decimal Expense { get; set; }
}