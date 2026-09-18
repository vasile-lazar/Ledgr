using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ledgr.Domain.Entities.User;
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
    
    [Required]
    public DateOnly Date { get; set; } = DateOnly.FromDateTime(DateTime.Now);
    
    [Required]
    public int UserId { get; set; }
    
    [ForeignKey("UserId")]
    public UserEntity User { get; set; } = null!;
}