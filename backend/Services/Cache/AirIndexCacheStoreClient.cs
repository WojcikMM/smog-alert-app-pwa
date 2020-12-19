using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using AirTrackerAPI.Dto;
using AirTrackerAPI.Dto.External;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AirTrackerAPI.Services.Cache
{
  public class AirIndexCacheStoreClient : ICacheStoreClient<ExternalAirIndexDto>
  {
    private readonly IMemoryCache _memoryCache;
    private readonly ILogger<AirIndexCacheStoreClient> _logger;
    private readonly string _airIndexDictionaryCacheKey = "AIR_INDEX_DICTIONARY";

    public AirIndexCacheStoreClient(IMemoryCache memoryCache, ILogger<AirIndexCacheStoreClient> logger)
    {
      _memoryCache = memoryCache;
      _logger = logger;
    }
 

    public IEnumerable<ExternalAirIndexDto> GetAllRecords(bool failIfNotExists = false)
    {
      return GetAllRectordsDictionary(failIfNotExists)?.Values ?? new List<ExternalAirIndexDto>();
    }

    public IDictionary<int, ExternalAirIndexDto> GetAllRectordsDictionary(bool failIfNotExists = false)
    {
      var entryNotExists = _memoryCache.TryGetValue(_airIndexDictionaryCacheKey, out IDictionary<int, ExternalAirIndexDto> airIndexesDictionary);

      if (failIfNotExists && (!entryNotExists || !airIndexesDictionary.Any()))
      {
        var message = "There is no air idexes records in cache yet.";
        _logger.LogWarning(message);
        throw new Exception(message);
      }

      return airIndexesDictionary;
    }

    public ExternalAirIndexDto GetRecordById(int stationId, bool failIfNotExists = false)
    {
      var entryExists = GetAllRectordsDictionary(failIfNotExists).TryGetValue(stationId, out ExternalAirIndexDto airIndexDto);

      if (failIfNotExists && !entryExists)
      {
        var message = $"Air index for given station id not exists in cache. Station id: {stationId}";
        _logger.LogError(message);
        throw new Exception(message);
      }

      return airIndexDto;
    }

    public void UpdateRecords(IEnumerable<ExternalAirIndexDto> recordsToUpdate)
    {
      var dict = recordsToUpdate.ToDictionary(x => x.Id);

      _memoryCache.Set(_airIndexDictionaryCacheKey, dict);
    }
  }

}
