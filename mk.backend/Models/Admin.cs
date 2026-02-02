namespace mk.backend.Models
{
  public class Admin : BaseEntity
  {
    public string MainImageUrl { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime LastLoginIn { get; set; }
  }
}
