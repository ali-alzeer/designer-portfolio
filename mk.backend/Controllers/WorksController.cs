using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using mk.backend.BaseController;
using mk.backend.DTOs.Request;
using mk.backend.DTOs.Response;
using mk.backend.Models;
using mk.backend.Services;

namespace mk.backend.Controllers
{
  public class WorksController(IWorkService service)
      : BaseApiController<Work, WorkRequestDTO, IWorkService>(service)
  {
    [AllowAnonymous]
    [HttpGet]
    public override async Task<ActionResult<ApiResponse<IEnumerable<Work>>>> GetAll()
    {
      var result = await _service.GetAllWithToolsAsync();
      return Ok(ApiResponse<object>.SuccessResponse(result));
    }

    [AllowAnonymous]
    [HttpGet("paged")]
    public override async Task<ActionResult<ApiResponse<IEnumerable<Work>>>> GetPaged(int skip, int take)
    {
      skip = Math.Max(0, skip);
      take = Math.Max(1, take);
      var result = await _service.GetAllWithToolsPagedAsync(skip, take);
      return Ok(ApiResponse<object>.SuccessResponse(result));
    }

    [AllowAnonymous]
    [HttpGet("{id}")]
    public override async Task<ActionResult<ApiResponse<Work>>> GetById(string id)
    {
      var result = await _service.GetByIdWithToolsAsync(id);
      return Ok(ApiResponse<object>.SuccessResponse(result));
    }

    [HttpPost]
    public override async Task<ActionResult<ApiResponse<Work>>> Create(WorkRequestDTO dto)
    {
      var result = await _service.AddWithToolsAsync(dto);
      return StatusCode(201, ApiResponse<object>.SuccessResponse(result, "Work created successfully with tools", 201));
    }

    [HttpPut("{id}")]
    public override async Task<ActionResult<ApiResponse<object>>> Update(string id, WorkRequestDTO dto)
    {
      await _service.UpdateWithToolsAsync(id, dto);
      return Ok(ApiResponse<object>.SuccessResponse(null, "Work updated successfully"));
    }
  }
}