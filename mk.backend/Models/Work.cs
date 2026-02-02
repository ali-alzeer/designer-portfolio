namespace mk.backend.Models
{
  public class Work() : BaseEntity
  {
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string DescriptionAr { get; set; } = string.Empty;
    public string DescriptionEn { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string PublicWorkMediaUrl { get; set; } = string.Empty;
    public List<Tool> Tools { get; set; } = [];
  }
}
