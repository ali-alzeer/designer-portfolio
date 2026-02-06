using AutoMapper;
using mk.backend.DTOs.Request;
using mk.backend.DTOs.Response;
using mk.backend.Models;

namespace mk.backend.Mapper
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<Work, WorkRequestDTO>().ReverseMap();
      CreateMap<Work, WorkResponseDTO>().ReverseMap();
      CreateMap<Tool, ToolRequestDTO>().ReverseMap();
      CreateMap<Tool, ToolResponseDTO>().ReverseMap();
      CreateMap<ContactInfo, ContactInfoRequestDTO>().ReverseMap();
      CreateMap<Admin, TokenResponseDTO>().ReverseMap();
    }
  }
}