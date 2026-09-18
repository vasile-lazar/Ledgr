using Ledgr.Domain.Enums;

namespace Ledgr.Domain.Models.Transaction;

public class ParsedTransactionDto 
{
    public DateOnly Date { get; set; }
    public string Merchant { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public TransactionType Category { get; set; }
}