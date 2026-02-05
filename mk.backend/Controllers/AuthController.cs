using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using mk.backend.DTOs.Request;
using mk.backend.DTOs.Response;
using mk.backend.Services;

namespace mk.backend.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class AuthController(IAuthService authService) : ControllerBase
  {
    [EnableRateLimiting("loginPolicy")]
    [HttpPost("signin")]
    public async Task<ActionResult<ApiResponse<TokenResponseDTO>>> Login([FromBody] AdminSignInRequestDTO dto)
    {
      // Pass 'Response' so the service can attach the cookie
      var result = await authService.SignInAsync(dto, Response);
      return Ok(result);
    }

    [HttpPost("refresh")]
    public async Task<ActionResult<ApiResponse<TokenResponseDTO>>> Refresh([FromBody] TokenRequestDTO dto)
    {
      var refreshToken = Request.Cookies["refreshToken"];

      if (string.IsNullOrEmpty(refreshToken))
        return Unauthorized(ApiResponse<object>.FailureResponse("Refresh token missing"));

      var result = await authService.RefreshTokenAsync(dto.ExpiredToken, refreshToken, Response);
      return Ok(result);
    }
    [Authorize]
    [HttpPut("update-image")]
    public async Task<ActionResult<ApiResponse<object>>> UpdateImage([FromBody] MainImageUpdateRequestDTO dto)
    {
      if (string.IsNullOrWhiteSpace(dto.MainImageUrl))
      {
        return BadRequest(ApiResponse<object>.FailureResponse("MainImageUrl field is required"));
      }
      var result = await authService.UpdateMainImageAsync(dto);
      return Ok(result);
    }
    [Authorize]
    [HttpPut("update-password")]
    public async Task<ActionResult<ApiResponse<object>>> UpdatePassword([FromBody] PasswordUpdateRequestDTO dto)
    {
      if (string.IsNullOrWhiteSpace(dto.NewPassword) || string.IsNullOrWhiteSpace(dto.OldPassword))
      {
        return BadRequest(ApiResponse<object>.FailureResponse("Both Passwords cannot be empty"));
      }
      var result = await authService.UpdatePasswordAsync(dto);
      return Ok(result);
    }

    [Authorize]
    [HttpPost("signout")]
    public async Task<ActionResult<ApiResponse<object>>> Logout()
    {
      await authService.SignOutAsync(Response);
      return Ok(ApiResponse<object>.SuccessResponse(null, "Logged out successfully"));
    }

    [HttpGet("main-image")]
    public async Task<ActionResult<ApiResponse<string>>> GetMainImage()
    {
      var result = await authService.GetMainImageUrlAsync();
      return Ok(result);
    }

  }
}