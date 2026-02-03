using System.ComponentModel.DataAnnotations;

namespace mk.backend.DTOs.Request
{
  public class ToolRequestDTO

  {
    [Required(ErrorMessage = "Title is required")]
    [MinLength(1, ErrorMessage = "Title cannot be empty")]
    [MaxLength(500)]
    public string Title { get; set; } = string.Empty;
    [Required(ErrorMessage = "PublicToolImageUrl is required")]
    [MinLength(1, ErrorMessage = "PublicToolImageUrl cannot be empty")]
    [MaxLength(500)]
    public string PublicToolImageUrl { get; set; } = string.Empty;
  }
}
