namespace Ledgr.Domain.Models.Statement;

public class StatementDto
{
    public string FilePath { get; set; } = String.Empty;
    public DateOnly Date {get; set;}
    public int Transactions { get; set; }
}