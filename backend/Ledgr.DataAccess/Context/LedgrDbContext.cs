using Ledgr.Domain.Entities.Budget;
using Ledgr.Domain.Entities.Statement;
using Ledgr.Domain.Entities.Transaction;
using Ledgr.Domain.Entities.User;
using Microsoft.EntityFrameworkCore;

namespace Ledgr.DataAccess.Context;

public class LedgrDbContext : DbContext
{
    public LedgrDbContext(DbContextOptions<LedgrDbContext> options) : base(options) { }

    public DbSet<UserEntity> Users { get; set; }
    public DbSet<TransactionEntity> Transactions { get; set; }
    public DbSet<BudgetEntity> Budgets { get; set; }
    public DbSet<StatementEntity> Statements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
}