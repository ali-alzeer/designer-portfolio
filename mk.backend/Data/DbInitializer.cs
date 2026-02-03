using Microsoft.EntityFrameworkCore;
using mk.backend.Models;

namespace mk.backend.Data
{
  public static class DbInitializer
  {
    public static async Task SyncAdminAsync(IServiceProvider serviceProvider)
    {
      using var scope = serviceProvider.CreateScope();
      var context = scope.ServiceProvider.GetRequiredService<IAppDbContext>();
      var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();

      // 1. Get secrets from Environment Variables (Safe & Dynamic)
      var id = configuration.GetValue<string>("ADMIN:INITIAL_ID") ?? throw new InvalidOperationException("ADMIN:INITIAL_ID is missing!");
      var passwordHash = configuration.GetValue<string>("ADMIN:INITIAL_PASSWORD") is not null ? BCrypt.Net.BCrypt.HashPassword(configuration.GetValue<string>("ADMIN:INITIAL_PASSWORD")) : throw new InvalidOperationException("ADMIN:INITIAL_PASSWORD is missing!");
      var mainImageUrl = configuration.GetValue<string>("ADMIN:INITIAL_MAIN_IMAGE_URL") ?? throw new InvalidOperationException("ADMIN:INITIAL_MAIN_IMAGE_URL is missing!");

      if (string.IsNullOrEmpty(passwordHash)) return;

      // 2. Check if Admin exists
      var admin = await context.Set<Admin>().FirstOrDefaultAsync();

      if (admin == null)
      {
        // Create if missing
        admin = new Admin
        {
          Id = id,
          PasswordHash = passwordHash,
          MainImageUrl = mainImageUrl,
          CreatedAt = DateTime.UtcNow
        };
        await context.Set<Admin>().AddAsync(admin);
      }
      else
      {
        // Sync/Update if Environment Variable changed
        // Note: This forces the DB to always match your Env Var on restart
        admin.PasswordHash = passwordHash;
        admin.MainImageUrl = mainImageUrl ?? admin.MainImageUrl;
        admin.UpdatedAt = DateTime.UtcNow;
      }

      await context.SaveChangesAsync();
    }
  }
}