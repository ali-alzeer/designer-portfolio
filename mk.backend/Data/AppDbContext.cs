using Microsoft.EntityFrameworkCore;
using mk.backend.Models;

namespace mk.backend.Data
{
  public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options), IAppDbContext
  {
    public DbSet<Admin> Admin => Set<Admin>();
    public DbSet<Work> Works => Set<Work>();
    public DbSet<Tool> Tools => Set<Tool>();
    public DbSet<ContactInfo> ContactInfo => Set<ContactInfo>();

  }
}