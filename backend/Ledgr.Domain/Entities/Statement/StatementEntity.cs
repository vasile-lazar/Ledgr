using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Ledgr.Domain.Entities.User;

namespace Ledgr.Domain.Entities.Statement;

public class StatementEntity
{ 
    [Required]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id  { get; set; }
    
    [Required]
    [StringLength(150)]
    public string FilePath { get; set; } = String.Empty;
    
    public DateOnly Date {get; set;} = DateOnly.FromDateTime(DateTime.Now);

    [Required]
    public int Transactions { get; set; }
    
    [Required]
    public int UserId { get; set; }
    
    [ForeignKey("UserId")]
    public UserEntity User { get; set; } = null!;
}