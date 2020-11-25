using Newtonsoft.Json;
using SmogAlertAPI.Dto;
using SmogAlertAPI.Dto.External;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;

namespace SmogAlertAPI.Services
{
  public class GiosHttptService : IAirQualityHttpClient
  {
    private readonly string _baseUrl = "http://api.gios.gov.pl/pjp-api/rest";


    public async Task<IEnumerable<ExternalStationDto>> GetAllStationsAsync()
    {
      var jsonResult = await GetRemoteData($"{_baseUrl}/station/findAll");

      return JsonConvert.DeserializeObject<IEnumerable<ExternalStationDto>>(jsonResult);
    }

    public async Task<IEnumerable<ExternalAirIndexDto>> GetAirIndexValues(IEnumerable<int> stationIds)
    {
      var airIndexRequests = stationIds.Select(async stationId => JsonConvert.DeserializeObject<ExternalAirIndexDto>(await GetRemoteData($"{_baseUrl}/aqindex/getIndex/{stationId}")));

      return await Task.WhenAll(airIndexRequests);
    }


    private async Task<string> GetRemoteData(string url)
    {
      var result = await new HttpClient().GetAsync(url);
      if (!result.IsSuccessStatusCode)
      {
        throw new HttpRequestException($"Cannot call to {url}, error code: {result.StatusCode}");
      }

      return await result.Content.ReadAsStringAsync();
    }


  }
}
