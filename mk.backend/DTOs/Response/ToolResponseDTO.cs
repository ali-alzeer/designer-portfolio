using System.ComponentModel.DataAnnotations;
using mk.backend.Models;

namespace mk.backend.DTOs.Response
{
  public class ToolResponseDTO : BaseEntity
  {
    [MaxLength(500)]
    public string Title { get; set; } = string.Empty;
    [MaxLength(500)]
    public string PublicToolImageUrl { get; set; } = string.Empty;
  }
}
