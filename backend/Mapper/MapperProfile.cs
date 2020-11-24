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
        //.ForMember(x => x.Summary.IndexDate, x => x.MapFrom(p => p.StSourceDataDate))
        //.ForMember(x => x.NO2.IndexDate, x => x.MapFrom(p => p.No2SourceDataDate))
        //.ForMember(x => x.O3.IndexDate, x => x.MapFrom(p => p.O3SourceDataDate))
        //.ForMember(x => x.PM10.IndexDate, x => x.MapFrom(p => p.Pm10SourceDataDate))
        //.ForMember(x => x.PM25.IndexDate, x => x.MapFrom(p => p.Pm25SourceDataDate))
        //.ForMember(x => x.SO2.IndexDate, x => x.MapFrom(p => p.So2SourceDataDate))
        //.ForMember(x => x.Benzene.IndexDate, x => x.MapFrom(p => p.C6h6SourceDataDate));

    }
  }
}
