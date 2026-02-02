namespace mk.backend.DTOs.Request
{
  public class ContactInfoUpdateRequest
  {
    public string Id { get; set; } = string.Empty;
    public string TitleAr { get; set; } = string.Empty;
    public string TitleEn { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public string Icon { get; set; } = string.Empty;
  }
}
