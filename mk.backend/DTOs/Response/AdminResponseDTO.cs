using mk.backend.Models;

namespace mk.backend.DTOs.Response
{
  public class AdminResponseDTO : BaseEntity
  {
    public string MainImageUrl { get; set; } = string.Empty;
    public DateTime LastLoginIn { get; set; }
    public string Token { get; set; } = string.Empty;
  }
}
