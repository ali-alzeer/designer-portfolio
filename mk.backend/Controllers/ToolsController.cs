using mk.backend.BaseController;
using mk.backend.DTOs.Request;
using mk.backend.Models;
using mk.backend.Services;

namespace mk.backend.Controllers
{
  public class ToolsController(IToolService service)
      : BaseApiController<Tool, ToolRequestDTO, IToolService>(service)
  { }
}