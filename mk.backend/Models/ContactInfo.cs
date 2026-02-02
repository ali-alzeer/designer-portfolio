namespace mk.backend.Models
{
  public class ContactInfo : BaseEntity
  {
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;

  }
}