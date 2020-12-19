using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using AirTrackerAPI.Dto.External;
using AirTrackerAPI.Services.Cache;

namespace AirTrackerAPI.Services.Jobs
{

  public class RefreshGiosRestDataJob : IHostedService, IDisposable
  {
    private readonly IAirQualityHttpClient _giosHttptService;
    private readonly ILogger<RefreshGiosRestDataJob> _logger;
    private readonly ICacheStoreClient<ExternalStationDto> _stationsCacheStore;
    private readonly ICacheStoreClient<ExternalAirIndexDto> _airIndexCacheStore;
    private readonly IConfiguration _configuration;
    private Timer stationsTimer;
    private Timer airIndexTimer;

    public RefreshGiosRestDataJob(ILogger<RefreshGiosRestDataJob> logger,
                                  IConfiguration configuration,
                                  IAirQualityHttpClient giosHttptService,
                                  ICacheStoreClient<ExternalStationDto> stationsCacheStore,
                                  ICacheStoreClient<ExternalAirIndexDto> airIndexCacheStore)
    {
      _logger = logger;
      _giosHttptService = giosHttptService;
      _stationsCacheStore = stationsCacheStore;
      _airIndexCacheStore = airIndexCacheStore;
      _configuration = configuration;
    }

    public Task StartAsync(CancellationToken cancellationToken)
    {
      _logger.LogInformation("Start invoke \"RefreshAirIndexJobService\"");

      var refreshCachePeriods = _configuration.GetSection("RefreshCachePeriod");

      var refreshStationsPeriod = refreshCachePeriods.GetValue<int>("Stations");
      var refreshAirIndexesPeriod = refreshCachePeriods.GetValue<int>("AirIndexes");

      stationsTimer = new Timer(RefreshStationsCache, null, TimeSpan.Zero, TimeSpan.FromMinutes(refreshStationsPeriod));

      airIndexTimer = new Timer(RefreshAirIndexCache, null, TimeSpan.FromSeconds(10), TimeSpan.FromMinutes(refreshAirIndexesPeriod));

      return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken cancellationToken)
    {
      stationsTimer?.Change(Timeout.Infinite, 0);
      airIndexTimer?.Change(Timeout.Infinite, 0);
      return Task.CompletedTask;
    }

    public void Dispose()
    {
      stationsTimer?.Dispose();
      airIndexTimer?.Dispose();
    }

    private async void RefreshStationsCache(object state)
    {
      _logger.LogInformation("Start Stations cache update process.");
      var stations = await _giosHttptService.GetAllStationsAsync();
      _stationsCacheStore.UpdateRecords(stations);
      _logger.LogInformation("Stations cache updated.");
    }

    private async void RefreshAirIndexCache(object state)
    {
      _logger.LogInformation("Start Air Index cache update process.");

      var stationsIds = _stationsCacheStore.GetAllRectordsDictionary(true).Keys;

      var airIndexesResults = await _giosHttptService.GetAirIndexValues(stationsIds);

      _airIndexCacheStore.UpdateRecords(airIndexesResults);

      _logger.LogInformation("Air indexes successfully updated.");
    }
  }
}
