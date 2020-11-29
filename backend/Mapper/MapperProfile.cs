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


      CreateMap<ExternalAirIndexDto, AirIndexDto>()
        .ForMember(x => x.Summary, x => x.MapFrom(new AirIndexValueResolver(AirIndexType.Summary)))
        .ForMember(x => x.Benzene, x => x.MapFrom(new AirIndexValueResolver(AirIndexType.Benzene)))
        .ForMember(x => x.SO2, x => x.MapFrom(new AirIndexValueResolver(AirIndexType.SO2)))
        .ForMember(x => x.CO, x => x.MapFrom(new AirIndexValueResolver(AirIndexType.CO)))
        .ForMember(x => x.O3, x => x.MapFrom(new AirIndexValueResolver(AirIndexType.O3)))
        .ForMember(x => x.PM10, x => x.MapFrom(new AirIndexValueResolver(AirIndexType.PM10)))
        .ForMember(x => x.PM25, x => x.MapFrom(new AirIndexValueResolver(AirIndexType.PM25)))
        .ForMember(x => x.NO2, x => x.MapFrom(new AirIndexValueResolver(AirIndexType.NO2)));
    }
  }
}
