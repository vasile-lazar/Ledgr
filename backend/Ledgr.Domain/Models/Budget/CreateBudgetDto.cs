using Ledgr.Domain.Enums;

namespace Ledgr.Domain.Models.Budget;

public class CreateBudgetDto
{
    public TransactionType Category { get; set; }
    public decimal Amount { get; set; }
}