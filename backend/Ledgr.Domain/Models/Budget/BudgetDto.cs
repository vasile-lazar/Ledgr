using Ledgr.Domain.Enums;

namespace Ledgr.Domain.Models.Budget;

public class BudgetDto
{
    public int Id { get; set; }
    public TransactionType Category { get; set; }
    public decimal Amount { get; set; }
    public decimal Used { get; set; }
    public DateOnly Date { get; set; }
}