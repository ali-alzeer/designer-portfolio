using System.ComponentModel.DataAnnotations;

namespace mk.backend.Models
{
  public class Admin : BaseEntity
  {
    [MaxLength(500)]
    public string MainImageUrl { get; set; } = string.Empty;
    [MaxLength(500)]
    public string PasswordHash { get; set; } = string.Empty;
    public DateTime LastLoginIn { get; set; }
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }
  }
}