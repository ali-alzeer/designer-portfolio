using AutoMapper;
using mk.backend.Data;
using mk.backend.DTOs.Request;
using mk.backend.Models;

namespace mk.backend.Services
{
  public interface IContactInfoService : IBaseService<ContactInfo, ContactInfoRequestDTO> { }
  public class ContactInfoService(IAppDbContext context, IMapper mapper) : BaseService<ContactInfo, ContactInfoRequestDTO>(context, mapper), IContactInfoService { }
}