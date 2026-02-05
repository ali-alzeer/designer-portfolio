using System.ComponentModel.DataAnnotations;

namespace mk.backend.DTOs.Request
{
  public class WorkRequestDTO
  {
    [Required(ErrorMessage = "TitleAr is required")]
    [MinLength(1, ErrorMessage = "TitleAr cannot be empty")]
    [MaxLength(500)]
    public string TitleAr { get; set; } = string.Empty;
    [Required(ErrorMessage = "TitleEn is required")]
    [MinLength(1, ErrorMessage = "TitleEn cannot be empty")]
    [MaxLength(500)]
    public string TitleEn { get; set; } = string.Empty;
    [Required(ErrorMessage = "DescriptionAr is required")]
    [MinLength(1, ErrorMessage = "DescriptionAr cannot be empty")]
    [MaxLength(500)]
    public string DescriptionAr { get; set; } = string.Empty;
    [Required(ErrorMessage = "DescriptionEn is required")]
    [MinLength(1, ErrorMessage = "DescriptionEn cannot be empty")]
    [MaxLength(500)]
    public string DescriptionEn { get; set; } = string.Empty;
    [Required(ErrorMessage = "Type is required")]
    [MinLength(1, ErrorMessage = "Type cannot be empty")]
    [MaxLength(100)]
    public string Type { get; set; } = string.Empty;
    [Required(ErrorMessage = "PublicWorkMediaUrl is required")]
    [MinLength(1, ErrorMessage = "PublicWorkMediaUrl cannot be empty")]
    [MaxLength(500)]
    public string PublicWorkMediaUrl { get; set; } = string.Empty;
    public List<string> ToolsIds { get; set; } = [];
  }
}
