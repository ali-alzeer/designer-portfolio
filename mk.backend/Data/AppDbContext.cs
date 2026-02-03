using Microsoft.EntityFrameworkCore;
using mk.backend.Models;

namespace mk.backend.Data
{
  public interface IAppDbContext
  {
    DbSet<Admin> Admin { get; }
    DbSet<Work> Works { get; }
    DbSet<Tool> Tools { get; }
    DbSet<ContactInfo> ContactInfo { get; }
    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    DbSet<TEntity> Set<TEntity>() where TEntity : class;
  }
  public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options), IAppDbContext
  {
    public DbSet<Admin> Admin => Set<Admin>();
    public DbSet<Work> Works => Set<Work>();
    public DbSet<Tool> Tools => Set<Tool>();
    public DbSet<ContactInfo> ContactInfo => Set<ContactInfo>();
  }
}