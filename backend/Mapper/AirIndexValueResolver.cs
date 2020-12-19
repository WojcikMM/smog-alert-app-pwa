using AutoMapper;
using AirTrackerAPI.Dto;
using AirTrackerAPI.Dto.External;

namespace AirTrackerAPI.Mapper
{
  public class AirIndexValueResolver : IValueResolver<ExternalAirIndexDto, AirIndexDto, AirIndexLevel>
  {
    private readonly AirIndexType airIndexType;

    public AirIndexValueResolver()
    {
    }
    public AirIndexValueResolver(AirIndexType airIndexType)
    {
      this.airIndexType = airIndexType;
    }

    public AirIndexLevel Resolve(ExternalAirIndexDto source, AirIndexDto destination, AirIndexLevel destMember, ResolutionContext context)
    {
      return airIndexType switch
      {
        AirIndexType.Summary => new AirIndexLevel
        {
          IndexDate = source.StSourceDataDate,
          IndexValue = GetIndexValue(source.StIndexLevel?.Id)
        },
        AirIndexType.Benzene => new AirIndexLevel
        {
          IndexDate = source.C6h6SourceDataDate,
          IndexValue = GetIndexValue(source.C6h6IndexLevel?.Id)
        },
        AirIndexType.SO2 => new AirIndexLevel
        {
          IndexDate = source.So2SourceDataDate,
          IndexValue = GetIndexValue(source.So2IndexLevel?.Id)
        },
        AirIndexType.CO => new AirIndexLevel
        {
          IndexDate = source.CoSourceDataDate,
          IndexValue = GetIndexValue(source.CoIndexLevel?.Id)
        },
        AirIndexType.O3 => new AirIndexLevel
        {
          IndexDate = source.O3SourceDataDate,
          IndexValue = GetIndexValue(source.O3IndexLevel?.Id)
        },
        AirIndexType.PM10 => new AirIndexLevel
        {
          IndexDate = source.Pm10SourceDataDate,
          IndexValue = GetIndexValue(source.Pm10IndexLevel?.Id)
        },
        AirIndexType.PM25 => new AirIndexLevel
        {
          IndexDate = source.Pm25SourceDataDate,
          IndexValue = GetIndexValue(source.Pm25IndexLevel?.Id)
        },
        AirIndexType.NO2 => new AirIndexLevel
        {
          IndexDate = source.No2SourceDataDate,
          IndexValue = GetIndexValue(source.No2IndexLevel?.Id)
        },
        _ => new AirIndexLevel
        {
          IndexDate = null,
          IndexValue = AirIndexValue.NO_VALUE
        },
      };
    }

    private AirIndexValue GetIndexValue(int? externalId)
    {
      return externalId switch
      {
        -1 => AirIndexValue.NO_VALUE,
        0 => AirIndexValue.VERY_GOOD,
        1 => AirIndexValue.GOOD,
        2 => AirIndexValue.MODERATE,
        3 => AirIndexValue.SUFFICIENT,
        4 => AirIndexValue.BAD,
        5 => AirIndexValue.VERRY_BAD,
        _ => AirIndexValue.UNKNOWN,
      };
    }
  }
}
