using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ledgr.Domain.Entities.User;
using Ledgr.Domain.Enums;

namespace Ledgr.Domain.Entities.Transaction;

public class TransactionEntity
{
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Required]
    public int UserId { get; set; }
    
    [ForeignKey("UserId")]
    public UserEntity User { get; set; } = null!;
    
    [Required]
    public DateOnly Date { get; set; }
    
    [Required]
    [StringLength(100)]
    public string Merchant { get; set; } = string.Empty;
    
    [Required]
    public decimal Amount { get; set; }
    
    [Required]
    public TransactionType Category { get; set; }
    
    public long CreatedAtTimestamp { get; set; }
}