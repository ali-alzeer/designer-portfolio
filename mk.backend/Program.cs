using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using mk.backend.Data;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

// ENVIRONMENT VARIABLES
var FRONTEND__ALLOWED_ORIGIN = builder.Configuration.GetValue<string>("FRONTEND:ALLOWED_ORIGIN") ?? throw new InvalidOperationException("FRONTEND:ALLOWED_ORIGIN is missing!");
var JWT__KEY = builder.Configuration.GetValue<string>("JWT:KEY") ?? throw new InvalidOperationException("JWT:KEY is missing!");
var JWT__ISSUER = builder.Configuration.GetValue<string>("JWT:ISSUER") ?? throw new InvalidOperationException("JWT:ISSUER is missing!");
var JWT__AUDIENCE = builder.Configuration.GetValue<string>("JWT:AUDIENCE") ?? throw new InvalidOperationException("JWT:AUDIENCE is missing!");
var JWT__ACCESS_TOKEN_LIFETIME_IN_HOURS = builder.Configuration.GetValue<string>("JWT:ACCESS_TOKEN_LIFETIME_IN_HOURS") ?? throw new InvalidOperationException("JWT:ACCESS_TOKEN_LIFETIME_IN_HOURS is missing!");
var JWT__REFRESH_TOKEN_LIFETIME_IN_HOURS = builder.Configuration.GetValue<string>("JWT:REFRESH_TOKEN_LIFETIME_IN_HOURS") ?? throw new InvalidOperationException("JWT:REFRESH_TOKEN_LIFETIME_IN_HOURS is missing!");
var DB__CONNECTION_STRING = builder.Configuration.GetValue<string>("DB:CONNECTION_STRING") ?? throw new InvalidOperationException("DB:CONNECTION_STRING is missing!");

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(DB__CONNECTION_STRING));

builder.Services.AddScoped<IAppDbContext>(provider => provider.GetRequiredService<AppDbContext>());

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
      // TokenValidationParameters define what "valid token" means for this API.
      options.TokenValidationParameters = new TokenValidationParameters
      {
        // Ensures the token was issued by a trusted issuer value.
        ValidateIssuer = true,

        // Ensures the token was intended for this API (audience check).
        ValidateAudience = true,

        // Ensures the token has not expired.
        ValidateLifetime = true,

        // Ensures the token's signature matches the signing key (prevents forgery).
        ValidateIssuerSigningKey = true,

        // Must match the issuer used when generating the JWT in the login endpoint.
        ValidIssuer = JWT__ISSUER,

        // Must match the audience used when generating the JWT in the login endpoint.
        ValidAudience = JWT__AUDIENCE,

        // This MUST be the same key used to sign tokens during login.
        IssuerSigningKey = new SymmetricSecurityKey(
              Encoding.UTF8.GetBytes(JWT__KEY))
      };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
  app.MapScalarApiReference();
}
app.UseHttpsRedirection();
app.UseCors(options =>
{
  options.WithOrigins([FRONTEND__ALLOWED_ORIGIN]).AllowAnyHeader().AllowAnyMethod().AllowCredentials();
});
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
