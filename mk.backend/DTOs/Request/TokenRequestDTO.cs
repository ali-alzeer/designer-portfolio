using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mk.backend.DTOs.Request
{
  public class TokenRequestDTO
  {
    public string AccessToken { get; set; } = "";
    public string RefreshToken { get; set; } = "";
  }
}