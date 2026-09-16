using Ledgr.Domain.Enums;

namespace Ledgr.Domain.Models.Analytics;

public class CategoryExpenseDto
{
    public TransactionType Category { get; set; }
    public int Expense { get; set; }
}