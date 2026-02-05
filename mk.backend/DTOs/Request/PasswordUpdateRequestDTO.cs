namespace mk.backend.DTOs.Request
{
  public class PasswordUpdateRequestDTO
  {
    public string OldPassword { get; set; } = "";
    public string NewPassword { get; set; } = "";
  }
}