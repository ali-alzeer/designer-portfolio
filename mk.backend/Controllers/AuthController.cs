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
    public async Task<ActionResult<ApiResponse<AdminResponseDTO>>> Login([FromBody] AdminSignInRequestDTO dto)
    {
      // Pass 'Response' so the service can attach the cookie
      var result = await authService.SignInAsync(dto, Response);
      return Ok(result);
    }

    [Authorize]
    [HttpPost("refresh")]
    public async Task<ActionResult<ApiResponse<AdminResponseDTO>>> Refresh([FromBody] string expiredToken)
    {
      // Read the refresh token from the cookie instead of the request body
      var refreshToken = Request.Cookies["refreshToken"];

      if (string.IsNullOrEmpty(refreshToken))
        return Unauthorized(ApiResponse<object>.FailureResponse("Refresh token missing"));

      var result = await authService.RefreshTokenAsync(expiredToken, refreshToken, Response);
      return Ok(result);
    }
    [Authorize]
    [HttpPut("update-profile")]
    public async Task<ActionResult<ApiResponse<object>>> UpdateProfile([FromBody] AdminUpdateRequestDTO dto)
    {
      var result = await authService.UpdateAdminAsync(dto);
      return Ok(result);
    }

    [Authorize]
    [HttpPost("signout")]
    public IActionResult Logout()
    {
      Response.Cookies.Delete("refreshToken");
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