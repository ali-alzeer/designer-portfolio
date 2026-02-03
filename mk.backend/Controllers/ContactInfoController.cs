using mk.backend.BaseController;
using mk.backend.DTOs.Request;
using mk.backend.Models;
using mk.backend.Services;

namespace mk.backend.Controllers
{
  public class ContactInfoController(IContactInfoService service)
      : BaseApiController<ContactInfo, ContactInfoRequestDTO, IContactInfoService>(service)
  { }
}