using System.ComponentModel.DataAnnotations;
using mk.backend.Models;

namespace mk.backend.DTOs.Response
{
  public class WorkResponseDTO : BaseEntity
  {
    [MaxLength(500)]
    public string TitleAr { get; set; } = string.Empty;
    [MaxLength(500)]
    public string TitleEn { get; set; } = string.Empty;
    [MaxLength(500)]
    public string DescriptionAr { get; set; } = string.Empty;
    [MaxLength(500)]
    public string DescriptionEn { get; set; } = string.Empty;
    [MaxLength(100)]
    public string Type { get; set; } = string.Empty;
    [MaxLength(500)]
    public string PublicWorkMediaUrl { get; set; } = string.Empty;
    public List<ToolResponseDTO> Tools { get; set; } = [];
  }
}
