namespace mk.backend.Models
{
  public class Tool : BaseEntity
  {
    public string Title { get; set; } = string.Empty;
    public string PublicToolImageUrl { get; set; } = string.Empty;
  }
}
