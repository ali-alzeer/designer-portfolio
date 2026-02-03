using Microsoft.AspNetCore.Diagnostics;
using mk.backend.DTOs.Response;
using System.Net;

namespace mk.backend.ExceptionHandler
{
  public class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger) : IExceptionHandler
  {
    private readonly ILogger<GlobalExceptionHandler> _logger = logger;

    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
      _logger.LogError(exception, "An unhandled exception occurred: {Message}", exception.Message);

      // Map exception types to status codes
      var (statusCode, message) = exception switch
      {
        KeyNotFoundException => (HttpStatusCode.NotFound, "The requested resource was not found."),
        UnauthorizedAccessException => (HttpStatusCode.Unauthorized, "You are not authorized to access this resource."),
        ArgumentException => (HttpStatusCode.BadRequest, "Invalid input provided."),
        _ => (HttpStatusCode.InternalServerError, "An unexpected error occurred on the server.")
      };

      var response = ApiResponse<object>.FailureResponse(message, new List<string> { exception.Message }, (int)statusCode);

      httpContext.Response.StatusCode = (int)statusCode;
      await httpContext.Response.WriteAsJsonAsync(response, cancellationToken);

      return true;
    }
  }
}