namespace mk.backend.DTOs.Request
{
  public class ToolUpdateRequest
  {
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string PublicToolImageUrl { get; set; } = string.Empty;
  }
}
