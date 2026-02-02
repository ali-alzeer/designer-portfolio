namespace mk.backend.DTOs.Request
{
  public class WorkUpdateRequest
  {
    public string Id { get; set; } = string.Empty;
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string PublicWorkMediaUrl { get; set; } = string.Empty;
    public List<int> ToolsIds { get; set; } = [];
  }
}
