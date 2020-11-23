using SmogAlertAPI.Dto.External;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SmogAlertAPI.Services
{
  public interface IAirQualityHttpClient
  {
    Task<IEnumerable<ExternalAirIndexDto>> GetAirIndexValues(IEnumerable<int> stationIds);
    Task<IEnumerable<ExternalStationDto>> GetAllStationsAsync();
  }
}
