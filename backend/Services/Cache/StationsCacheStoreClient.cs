using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using SmogAlertAPI.Dto;
using SmogAlertAPI.Dto.External;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SmogAlertAPI.Services.Cache
{
  public class StationsCacheStoreClient : ICacheStoreClient<ExternalStationDto>
  {
    private readonly IMemoryCache _memoryCache;
    private readonly ILogger<StationsCacheStoreClient> _logger;
    private readonly string _stationsCacheKey = "STATIONS_DICTIONARY";

    public StationsCacheStoreClient(IMemoryCache memoryCache, ILogger<StationsCacheStoreClient> logger)
    {
      _memoryCache = memoryCache;
      _logger = logger;
    }

    public IEnumerable<ExternalStationDto> GetAllRecords(bool failIfNotExists = false)
    {
      return GetAllRectordsDictionary(failIfNotExists).Values;
    }

    public IDictionary<int, ExternalStationDto> GetAllRectordsDictionary(bool failIfNotExists = false)
    {
      var entryNotExists = _memoryCache.TryGetValue(_stationsCacheKey, out IDictionary<int, ExternalStationDto> stations);

      if (failIfNotExists && (!entryNotExists || !stations.Any()))
      {
        var message = "There is no stations recorded yet.";
        _logger.LogWarning(message);
        throw new Exception(message);
      }

      return stations;
    }

    public ExternalStationDto GetRecordById(int stationId, bool failIfNotExists = false)
    {
      var entryExists = GetAllRectordsDictionary(failIfNotExists).TryGetValue(stationId, out ExternalStationDto stationDto);

      if (failIfNotExists && !entryExists)
      {
        var message = $"There is no station with given id in cache. Station id: {stationId}";
        _logger.LogError(message);
        throw new Exception(message);
      }

      return stationDto;
    }

    public void UpdateRecords(IEnumerable<ExternalStationDto> recordsToUpdate)
    {
      var dict = recordsToUpdate.ToDictionary(x => x.Id);
      _memoryCache.Set(_stationsCacheKey, dict);
    }
  }

}
