using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using mk.backend.DTOs.Response;
using mk.backend.Services;

namespace mk.backend.BaseController
{
  [Authorize]
  [ApiController]
  [Route("api/[controller]")]
  public abstract class BaseApiController<T, TDto, TService>(TService service) : ControllerBase
      where T : class
      where TDto : class
      where TService : IBaseService<T, TDto>
  {
    protected readonly TService _service = service;

    [AllowAnonymous]
    [HttpGet]
    public virtual async Task<ActionResult<ApiResponse<IEnumerable<T>>>> GetAll()
    {
      var result = await _service.GetAllAsync();
      return Ok(ApiResponse<IEnumerable<T>>.SuccessResponse(result));
    }

    [AllowAnonymous]
    [HttpGet("paged")]
    public virtual async Task<ActionResult<ApiResponse<IEnumerable<T>>>> GetPaged(int page = 1, int pageSize = 10)
    {
      var result = await _service.GetAllPagedAsync(page, pageSize);
      return Ok(ApiResponse<IEnumerable<T>>.SuccessResponse(result));
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public virtual async Task<ActionResult<ApiResponse<T>>> GetById(string id)
    {
      var result = await _service.GetByIdAsync(id);
      if (result == null) throw new KeyNotFoundException("Item not found.");
      return Ok(ApiResponse<T>.SuccessResponse(result));
    }

    [HttpPost]
    public virtual async Task<ActionResult<ApiResponse<T>>> Create(TDto dto)
    {
      var result = await _service.AddAsync(dto);
      return StatusCode(201, ApiResponse<T>.SuccessResponse(result, "Created successfully", 201));
    }

    [HttpPut("{id}")]
    public virtual async Task<ActionResult<ApiResponse<object>>> Update(string id, TDto dto)
    {
      await _service.UpdateAsync(id, dto);
      return Ok(ApiResponse<object>.SuccessResponse(null, "Updated successfully"));
    }

    [HttpDelete("{id}")]
    public virtual async Task<ActionResult<ApiResponse<object>>> Delete(string id)
    {
      await _service.DeleteAsync(id);
      return Ok(ApiResponse<object>.SuccessResponse(null, "Deleted successfully"));
    }
  }
}