using AutoMapper;
using mk.backend.Data;
using mk.backend.DTOs.Request;
using mk.backend.Models;

namespace mk.backend.Services
{
  public interface IWorkService : IBaseService<Work, WorkRequestDTO> { }
  public class WorkService(IAppDbContext context, IMapper mapper) : BaseService<Work, WorkRequestDTO>(context, mapper), IWorkService { }
}