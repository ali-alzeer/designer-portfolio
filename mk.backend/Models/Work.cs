using System.ComponentModel.DataAnnotations;

namespace mk.backend.Models
{
  public class Work() : BaseEntity
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
    public List<Tool> Tools { get; set; } = [];
  }
}
