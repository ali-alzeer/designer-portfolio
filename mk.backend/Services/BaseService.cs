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
    Task<int> GetCountAsync();
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

    public virtual async Task<IEnumerable<T>> GetAllAsync()
    {
      var entities = await _context.Set<T>().AsNoTracking().OrderByDescending(x => x.CreatedAt).ToListAsync();
      return _mapper.Map<IEnumerable<T>>(entities);
    }
    public virtual async Task<IEnumerable<T>> GetAllPagedAsync(int skip, int take)
    {
      skip = Math.Max(0, skip);
      take = Math.Max(1, take);
      var entities = await _context.Set<T>()
          .AsNoTracking()
          .OrderByDescending(x => x.CreatedAt)
          .Skip(skip)
          .Take(take)
          .ToListAsync();

      return _mapper.Map<IEnumerable<T>>(entities);
    }
    public virtual async Task<T> GetByIdAsync(string id)
    {
      var entity = await _context.Set<T>().FindAsync(id);
      return _mapper.Map<T>(entity);
    }
    public virtual async Task<int> GetCountAsync()
    {
      return await _context.Set<T>().CountAsync();
    }


    public virtual async Task<T> AddAsync(TDto dto)
    {
      var entity = _mapper.Map<T>(dto);
      await _context.Set<T>().AddAsync(entity);
      await _context.SaveChangesAsync();
      return _mapper.Map<T>(entity);
    }

    public virtual async Task UpdateAsync(string id, TDto dto)
    {
      var existing = await _context.Set<T>().FindAsync(id) ?? throw new KeyNotFoundException("Record not found.");
      _mapper.Map(dto, existing);
      await _context.SaveChangesAsync();
    }

    public virtual async Task DeleteAsync(string id)
    {
      var entity = await _context.Set<T>().FindAsync(id);
      if (entity != null)
      {
        _context.Set<T>().Remove(entity);
        await _context.SaveChangesAsync();
      }
    }

  }
}