using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ledgr.Domain.Enums;

namespace Ledgr.Domain.Entities.Budget;

public class BudgetEntity
{
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Required]
    public TransactionType Category { get; set; }
    
    [Required]
    public decimal Amount { get; set; }
    
    [Required]
    public decimal Used { get; set; }
}