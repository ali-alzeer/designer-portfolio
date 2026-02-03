using AutoMapper;
using mk.backend.Data;
using mk.backend.DTOs.Request;
using mk.backend.Models;

namespace mk.backend.Services
{
  public interface IToolService : IBaseService<Tool, ToolRequestDTO> { }
  public class ToolService(IAppDbContext context, IMapper mapper) : BaseService<Tool, ToolRequestDTO>(context, mapper), IToolService { }
}