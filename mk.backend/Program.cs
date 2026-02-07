using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.OpenApi;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using mk.backend.Data;
using mk.backend.DTOs.Response;
using mk.backend.ExceptionHandler;
using mk.backend.Mapper;
using mk.backend.Services;
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
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IWorkService, WorkService>();
builder.Services.AddScoped<IToolService, ToolService>();
builder.Services.AddScoped<IContactInfoService, ContactInfoService>();
builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: "AllowedOriginOnly",
                    policy =>
                    {
                      policy.WithOrigins(FRONTEND__ALLOWED_ORIGIN)
                              .AllowAnyHeader()
                              .AllowAnyMethod()
                              .AllowCredentials();
                    });
});
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
      options.Events = new JwtBearerEvents
      {
        OnChallenge = async context =>
        {
          context.HandleResponse();
          context.Response.StatusCode = 401;
          var response = ApiResponse<object>.FailureResponse("You are not authorized", null, 401);
          await context.Response.WriteAsJsonAsync(response);
        },
        OnForbidden = async context =>
        {
          context.Response.StatusCode = 403;
          var response = ApiResponse<object>.FailureResponse("You do not have permission", null, 403);
          await context.Response.WriteAsJsonAsync(response);
        }
      };
    });

builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer(); builder.Services.AddAutoMapper(typeof(MappingProfile));

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();
builder.Services.Configure<ApiBehaviorOptions>(options =>
{
  options.InvalidModelStateResponseFactory = context =>
  {
    // 1. Extract the error messages from the ModelState
    var errors = context.ModelState.Values
          .SelectMany(v => v.Errors)
          .Select(e => e.ErrorMessage)
          .ToList();

    // 2. Wrap them in your standard ApiResponse
    var response = ApiResponse<object>.FailureResponse(
          message: "Validation failed",
          errors: errors,
          statusCode: 400
      );

    // 3. Return it as a 400 Bad Request
    return new BadRequestObjectResult(response);
  };
});
builder.Services.AddRateLimiter(options =>
{
  options.AddFixedWindowLimiter("loginPolicy", opt =>
  {
    opt.Window = TimeSpan.FromMinutes(1);
    opt.PermitLimit = 5;
    opt.QueueLimit = 0;
  });
});
var app = builder.Build();
app.UseCors("AllowedOriginOnly");
app.UseExceptionHandler();
if (app.Environment.IsDevelopment())
{
  app.MapOpenApi();
  app.MapScalarApiReference(options =>
  {
    options
          .WithTitle("Admin Dashboard API")
          .WithTheme(ScalarTheme.Purple)
          .WithDefaultHttpClient(ScalarTarget.CSharp, ScalarClient.HttpClient)
          .AddPreferredSecuritySchemes("Bearer");
  });
}
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
using (var scope = app.Services.CreateScope())
{
  var services = scope.ServiceProvider;
  try
  {
    // 2. Resolve the AppDbContext
    var context = services.GetRequiredService<AppDbContext>();

    // 3. (Optional but Recommended) Run any pending migrations
    // This ensures the database exists and has the latest tables
    await context.Database.MigrateAsync();

    // 4. Call your custom Sync logic
    // Assuming you named your method SyncAdminAsync inside DbInitializer
    await DbInitializer.SyncAdminAsync(services);
  }
  catch (Exception ex)
  {
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred while migrating or seeding the database.");
  }
}
app.Run();
