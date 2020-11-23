using AutoMapper;
using SmogAlertAPI.Dto;
using SmogAlertAPI.Dto.External;

namespace SmogAlertAPI.Mapper
{
  public class MapperProfile : Profile
  {
    public MapperProfile()
    {
      CreateMap<ExternalStationDto, StationDto>()
        .ForMember(x => x.Name, x => x.MapFrom(p => p.StationName))
        .ForMember(x => x.ProvinceName, x => x.MapFrom(p => p.City.Commune.ProvinceName))
        .ForMember(x => x.DistrinctName, x => x.MapFrom(p => p.City.Commune.DistrictName))
        .ForMember(x => x.CommuneName, x => x.MapFrom(p => p.City.Commune.CommuneName));


      CreateMap<ExternalAirIndexDto, AirIndexDto>();
    }
  }
}
