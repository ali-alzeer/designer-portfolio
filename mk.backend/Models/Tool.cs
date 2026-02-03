using System.ComponentModel.DataAnnotations;

namespace mk.backend.Models
{
  public class Tool : BaseEntity
  {
    [MaxLength(500)]
    public string Title { get; set; } = string.Empty;
    [MaxLength(500)]
    public string PublicToolImageUrl { get; set; } = string.Empty;
    public List<Work> Works { get; set; } = [];
  }
}
