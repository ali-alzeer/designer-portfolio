using Microsoft.EntityFrameworkCore;
using AutoMapper;
using mk.backend.Data;
using mk.backend.Models;

namespace mk.backend.Services
{
  public interface IBaseService<T, TDto>
      where T : class
      where TDto : class
  {
    Task<IEnumerable<T>> GetAllAsync();
    Task<IEnumerable<T>> GetAllPagedAsync(int page, int pageSize);
    Task<T> GetByIdAsync(string id);
    Task<T> AddAsync(TDto dto);
    Task UpdateAsync(string id, TDto dto);
    Task DeleteAsync(string id);
  }

  public class BaseService<T, TDto>(IAppDbContext context, IMapper mapper) : IBaseService<T, TDto>
      where T : BaseEntity
      where TDto : class
  {
    protected readonly IAppDbContext _context = context;
    protected readonly IMapper _mapper = mapper;

    public async Task<IEnumerable<T>> GetAllAsync()
    {
      var entities = await _context.Set<T>().AsNoTracking().OrderByDescending(x => x.CreatedAt).ToListAsync();
      return _mapper.Map<IEnumerable<T>>(entities);
    }

    public async Task<T> GetByIdAsync(string id)
    {
      var entity = await _context.Set<T>().FindAsync(id);
      return _mapper.Map<T>(entity);
    }

    public async Task<T> AddAsync(TDto dto)
    {
      var entity = _mapper.Map<T>(dto);
      await _context.Set<T>().AddAsync(entity);
      await _context.SaveChangesAsync();
      return _mapper.Map<T>(entity);
    }

    public async Task UpdateAsync(string id, TDto dto)
    {
      var existing = await _context.Set<T>().FindAsync(id) ?? throw new KeyNotFoundException("Record not found.");
      _mapper.Map(dto, existing);
      await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(string id)
    {
      var entity = await _context.Set<T>().FindAsync(id);
      if (entity != null)
      {
        _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync();
      }
    }
    public async Task<IEnumerable<T>> GetAllPagedAsync(int page, int pageSize)
    {
      var entities = await _context.Set<T>()
          .AsNoTracking()
          .OrderByDescending(x => x.CreatedAt)
          .Skip((page - 1) * pageSize)
          .Take(pageSize)
          .ToListAsync();

      return _mapper.Map<IEnumerable<T>>(entities);
    }
  }
}