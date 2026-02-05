using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using mk.backend.Data;
using mk.backend.DTOs.Request;
using mk.backend.DTOs.Response;
using mk.backend.Models;
using BC = BCrypt.Net.BCrypt;

namespace mk.backend.Services
{
  public interface IAuthService
  {
    Task<ApiResponse<TokenResponseDTO>> SignInAsync(AdminSignInRequestDTO dto, HttpResponse response);
    Task<ApiResponse<TokenResponseDTO>> RefreshTokenAsync(string expiredToken, string refreshToken, HttpResponse response);
    Task<ApiResponse<object>> UpdateMainImageAsync(MainImageUpdateRequestDTO dto);
    Task<ApiResponse<object>> UpdatePasswordAsync(PasswordUpdateRequestDTO dto);
    Task<ApiResponse<string>> GetMainImageUrlAsync();
    Task<ApiResponse<object>> SignOutAsync(HttpResponse response);
  }
  public class AuthService(IAppDbContext context, IConfiguration config) : IAuthService
  {
    public async Task<ApiResponse<TokenResponseDTO>> SignInAsync(AdminSignInRequestDTO dto, HttpResponse response)
    {
      var admin = await context.Set<Admin>().FirstOrDefaultAsync();

      if (admin == null || !BC.Verify(dto.Password, admin.PasswordHash))
      {
        throw new UnauthorizedAccessException("Invalid credentials.");
      }

      // 1. Generate Tokens
      var accessToken = GenerateJwtToken(admin);
      var refreshToken = GenerateRefreshToken();

      // 2. Save Refresh Token to Database
      admin.LastLoginIn = DateTime.UtcNow;
      admin.RefreshToken = refreshToken;
      admin.RefreshTokenExpiryTime = DateTime.UtcNow.AddHours(double.Parse(config["JWT:REFRESH_TOKEN_LIFETIME_IN_HOURS"]!));
      await context.SaveChangesAsync();

      // 3. Attach Refresh Token to HttpOnly Cookie
      SetRefreshTokenCookie(refreshToken, response);

      var tokenDto = new TokenResponseDTO
      {
        Token = accessToken
      };

      return ApiResponse<TokenResponseDTO>.SuccessResponse(tokenDto, "Login successful");
    }
    public async Task<ApiResponse<object>> UpdateMainImageAsync(MainImageUpdateRequestDTO dto)
    {
      var admin = await context.Set<Admin>().FirstOrDefaultAsync() ?? throw new KeyNotFoundException("Admin not found.");
      if (string.IsNullOrWhiteSpace(dto.MainImageUrl))
        throw new InvalidOperationException("Main Image is Required");

      admin.MainImageUrl = dto.MainImageUrl;

      admin.UpdatedAt = DateTime.UtcNow;
      await context.SaveChangesAsync();

      return ApiResponse<object>.SuccessResponse(null, "MainImage updated successfully");
    }
    public async Task<ApiResponse<object>> UpdatePasswordAsync(PasswordUpdateRequestDTO dto)
    {
      var admin = await context.Set<Admin>().FirstOrDefaultAsync() ?? throw new KeyNotFoundException("Admin not found.");
      if (string.IsNullOrWhiteSpace(dto.OldPassword) || string.IsNullOrWhiteSpace(dto.NewPassword))
        throw new InvalidOperationException("Passwords are Required");
      if (!BC.Verify(dto.OldPassword, admin.PasswordHash))
        throw new InvalidOperationException("Invalid Old Password");

      admin.PasswordHash = BC.HashPassword(dto.NewPassword);

      admin.UpdatedAt = DateTime.UtcNow;
      await context.SaveChangesAsync();

      return ApiResponse<object>.SuccessResponse(null, "Password updated successfully");
    }
    private void SetRefreshTokenCookie(string refreshToken, HttpResponse response)
    {
      var cookieOptions = new CookieOptions
      {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None,
        Expires = DateTime.UtcNow.AddHours(double.Parse(config["JWT:REFRESH_TOKEN_LIFETIME_IN_HOURS"]!))
      };
      response.Cookies.Append("refreshToken", refreshToken, cookieOptions);
    }
    public async Task<ApiResponse<string>> GetMainImageUrlAsync()
    {
      var adminMainImage = await context.Set<Admin>().Select(a => a.MainImageUrl).FirstOrDefaultAsync();
      return ApiResponse<string>.SuccessResponse(adminMainImage ?? string.Empty);
    }
    public async Task<ApiResponse<TokenResponseDTO>> RefreshTokenAsync(string expiredToken, string refreshToken, HttpResponse response)
    {
      var principal = GetPrincipalFromExpiredToken(expiredToken);
      var adminId = principal.FindFirstValue(ClaimTypes.NameIdentifier);
      var admin = await context.Set<Admin>().FirstOrDefaultAsync(a => a.Id == adminId);

      // Validate the token from the cookie against the database
      if (admin == null || admin.RefreshToken != refreshToken || admin.RefreshTokenExpiryTime <= DateTime.UtcNow)
      {
        throw new UnauthorizedAccessException("Session expired. Please login again.");
      }

      // 1. Generate NEW pair
      var newAccessToken = GenerateJwtToken(admin);
      var newRefreshToken = GenerateRefreshToken();

      // 2. Update Database with the NEW refresh token (Rotation)
      admin.RefreshToken = newRefreshToken;
      admin.RefreshTokenExpiryTime = DateTime.UtcNow.AddHours(double.Parse(config["JWT:REFRESH_TOKEN_LIFETIME_IN_HOURS"]!));
      await context.SaveChangesAsync();

      // 3. Overwrite the old cookie with the NEW refresh token
      SetRefreshTokenCookie(newRefreshToken, response);

      return ApiResponse<TokenResponseDTO>.SuccessResponse(new TokenResponseDTO
      {
        Token = newAccessToken,
      });
    }
    public async Task<ApiResponse<object>> SignOutAsync(HttpResponse response)
    {
      var admin = await context.Set<Admin>().FirstOrDefaultAsync() ?? throw new UnauthorizedAccessException("Admin not found");

      admin.RefreshToken = null;
      admin.RefreshTokenExpiryTime = null;
      await context.SaveChangesAsync();

      var cookieOptions = new CookieOptions
      {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None,
        Expires = DateTime.UtcNow.AddDays(-1)
      };
      response.Cookies.Append("refreshToken", "", cookieOptions);

      return ApiResponse<object>.SuccessResponse(null, "Logout successful");
    }

    private string GenerateRefreshToken()
    {
      var randomNumber = new byte[64];
      using var rng = RandomNumberGenerator.Create();
      rng.GetBytes(randomNumber);
      return Convert.ToBase64String(randomNumber);
    }

    private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
      var tokenValidationParameters = new TokenValidationParameters
      {
        ValidateAudience = true,
        ValidateIssuer = true,
        ValidIssuer = config["JWT:ISSUER"],
        ValidAudience = config["JWT:AUDIENCE"],
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:KEY"]!)),
        ValidateLifetime = false // Critical: we want to read the expired token
      };

      var tokenHandler = new JwtSecurityTokenHandler();
      var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

      if (securityToken is not JwtSecurityToken jwtSecurityToken ||
          !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
        throw new SecurityTokenException("Invalid token");

      return principal;
    }
    private string GenerateJwtToken(Admin admin)
    {
      var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["JWT:KEY"]!));
      var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

      var claims = new[]
      {
            new Claim(ClaimTypes.NameIdentifier, admin.Id),
            new Claim(ClaimTypes.Role, "Admin")
        };

      var token = new JwtSecurityToken(
          issuer: config["JWT:ISSUER"],
          audience: config["JWT:AUDIENCE"],
          claims: claims,
          expires: DateTime.UtcNow.AddHours(double.Parse(config["JWT:ACCESS_TOKEN_LIFETIME_IN_HOURS"]!)),
          signingCredentials: credentials);

      return new JwtSecurityTokenHandler().WriteToken(token);
    }
  }
}