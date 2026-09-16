using Ledgr.Domain.Enums;

namespace Ledgr.Domain.Models.Budget;

public class BudgetDto
{
    public TransactionType Category { get; set; }
    public decimal Amount { get; set; }
    public decimal Used { get; set; }
}