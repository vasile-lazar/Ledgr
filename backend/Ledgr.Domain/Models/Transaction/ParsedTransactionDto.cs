using Ledgr.Domain.Enums;

namespace Ledgr.Domain.Models.Transaction;

public class ParsedTransactionDto 
{
    public string Date { get; set; } = string.Empty;
    public string Merchant { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public TransactionType Category { get; set; }
}