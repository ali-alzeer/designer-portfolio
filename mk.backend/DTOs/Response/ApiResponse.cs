namespace mk.backend.DTOs.Response
{
  public class ApiResponse<T>
  {
    public bool Success { get; set; }
    public string Message { get; set; } = "";
    public T? Data { get; set; }
    public List<string>? Errors { get; set; }
    public int StatusCode { get; set; }

    // Success response helper
    public static ApiResponse<T> SuccessResponse(T data, string message = "Success", int statusCode = 200)
    {
      return new ApiResponse<T> { Success = true, Data = data, Message = message, StatusCode = statusCode };
    }

    // Failure response helper
    public static ApiResponse<T> FailureResponse(string message, List<string>? errors = null, int statusCode = 400)
    {
      return new ApiResponse<T> { Success = false, Message = message, Errors = errors, StatusCode = statusCode };
    }
  }
}