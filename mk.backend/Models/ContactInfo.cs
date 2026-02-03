using System.ComponentModel.DataAnnotations;

namespace mk.backend.Models
{
  public class ContactInfo : BaseEntity
  {
    [MaxLength(500)]
    public string TitleAr { get; set; } = string.Empty;
    [MaxLength(500)]
    public string TitleEn { get; set; } = string.Empty;
    [MaxLength(500)]
    public string Url { get; set; } = string.Empty;
    [MaxLength(500)]
    public string Icon { get; set; } = string.Empty;

  }
}