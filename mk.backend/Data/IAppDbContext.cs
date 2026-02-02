using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
  }
}
