using AutoMapper;
using mk.backend.Data;
using mk.backend.DTOs.Request;
using mk.backend.Models;
using Microsoft.EntityFrameworkCore;
using mk.backend.DTOs.Response;

namespace mk.backend.Services
{
  public interface IWorkService : IBaseService<Work, WorkRequestDTO>
  {
    Task<IEnumerable<WorkResponseDTO>> GetAllWithToolsAsync();
    Task<IEnumerable<WorkResponseDTO>> GetAllWithToolsPagedAsync(int page, int pageSize);
    Task<WorkResponseDTO> GetByIdWithToolsAsync(string id);
    Task<WorkResponseDTO> AddWithToolsAsync(WorkRequestDTO dto);
    Task UpdateWithToolsAsync(string id, WorkRequestDTO dto);
  }
  public class WorkService(IAppDbContext context, IMapper mapper) : BaseService<Work, WorkRequestDTO>(context, mapper), IWorkService
  {
    public async Task<IEnumerable<WorkResponseDTO>> GetAllWithToolsAsync()
    {
      var entities = await _context.Set<Work>()
          .Include(x => x.Tools)
          .AsNoTracking()
          .OrderByDescending(x => x.CreatedAt)
          .ToListAsync();
      return _mapper.Map<IEnumerable<WorkResponseDTO>>(entities);
    }
    public async Task<IEnumerable<WorkResponseDTO>> GetAllWithToolsPagedAsync(int skip, int take)
    {
      skip = Math.Max(0, skip);
      take = Math.Max(1, take);
      var entities = await _context.Set<Work>()
          .Include(x => x.Tools)
          .AsNoTracking()
          .OrderByDescending(x => x.CreatedAt)
          .Skip(skip)
          .Take(take)
          .ToListAsync();

      return _mapper.Map<IEnumerable<WorkResponseDTO>>(entities);
    }

    public async Task<WorkResponseDTO> GetByIdWithToolsAsync(string id)
    {
      var entity = await _context.Set<Work>()
          .Include(x => x.Tools)
          .AsNoTracking()
          .FirstOrDefaultAsync(x => x.Id == id) ?? throw new KeyNotFoundException($"Work with ID {id} not found.");
      return _mapper.Map<WorkResponseDTO>(entity);
    }

    public async Task<WorkResponseDTO> AddWithToolsAsync(WorkRequestDTO dto)
    {
      var work = _mapper.Map<Work>(dto);

      if (dto.ToolsIds != null && dto.ToolsIds.Count > 0)
      {
        var selectedTools = await _context.Set<Tool>()
            .Where(t => dto.ToolsIds.Contains(t.Id))
            .ToListAsync();

        work.Tools = selectedTools;
      }

      await _context.Set<Work>().AddAsync(work);
      await _context.SaveChangesAsync();

      return _mapper.Map<WorkResponseDTO>(work);
    }

    public async Task UpdateWithToolsAsync(string id, WorkRequestDTO dto)
    {
      var existingWork = await _context.Set<Work>()
          .Include(w => w.Tools)
          .FirstOrDefaultAsync(w => w.Id == id)
          ?? throw new KeyNotFoundException("Record not found.");

      _mapper.Map(dto, existingWork);

      existingWork.Tools.Clear();
      if (dto.ToolsIds != null && dto.ToolsIds.Count > 0)
      {
        var selectedTools = await _context.Set<Tool>()
            .Where(t => dto.ToolsIds.Contains(t.Id))
            .ToListAsync();

        foreach (var tool in selectedTools)
        {
          existingWork.Tools.Add(tool);
        }
      }

      await _context.SaveChangesAsync();
    }
  }
}