using System.ComponentModel.DataAnnotations;

namespace mk.backend.DTOs.Request
{
  public class ContactInfoRequestDTO

  {
    [Required(ErrorMessage = "TitleAr is required")]
    [MinLength(1, ErrorMessage = "TitleAr cannot be empty")]
    [MaxLength(500)]
    public string TitleAr { get; set; } = string.Empty;
    [Required(ErrorMessage = "TitleEn is required")]
    [MinLength(1, ErrorMessage = "TitleEn cannot be empty")]
    [MaxLength(500)]
    public string TitleEn { get; set; } = string.Empty;
    [Required(ErrorMessage = "Url is required")]
    [MinLength(1, ErrorMessage = "Url cannot be empty")]
    [MaxLength(500)]
    public string Url { get; set; } = string.Empty;
    [Required(ErrorMessage = "Icon is required")]
    [MinLength(1, ErrorMessage = "Icon cannot be empty")]
    [MaxLength(500)]
    public string Icon { get; set; } = string.Empty;
  }
}
