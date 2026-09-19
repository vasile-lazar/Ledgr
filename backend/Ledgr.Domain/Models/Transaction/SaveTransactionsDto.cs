namespace Ledgr.Domain.Models.Transaction;

public class SaveTransactionsDto 
{
    public List<ParsedTransactionDto> Transactions { get; set; } = new();
}