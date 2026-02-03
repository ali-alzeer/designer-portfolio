using mk.backend.BaseController;
using mk.backend.DTOs.Request;
using mk.backend.Models;
using mk.backend.Services;

namespace mk.backend.Controllers
{
  public class WorksController(IWorkService service)
      : BaseApiController<Work, WorkRequestDTO, IWorkService>(service)
  { }
}