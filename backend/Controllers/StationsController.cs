using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SmogAlertAPI.Dto;
using SmogAlertAPI.Dto.External;
using SmogAlertAPI.Services;
using SmogAlertAPI.Services.Cache;
using System.Collections.Generic;

namespace SmogAlertAPI.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class StationsController : ControllerBase
  {

    private readonly ICacheStoreClient<ExternalStationDto> _stationsCacheStoreClient;
    private readonly NearestLocationService _nearestLocationService;
    private readonly IMapper _mapper;

    public StationsController(IMapper mapper,
                              NearestLocationService nearestLocationService,
                              ICacheStoreClient<ExternalStationDto> stationsCacheStoreClient)
    {
      _mapper = mapper;
      _nearestLocationService = nearestLocationService;
      _stationsCacheStoreClient = stationsCacheStoreClient;
    }

    [HttpGet]
    public IActionResult Get()
    {
      var allStations = _stationsCacheStoreClient.GetAllRecords();
      var allStationsDto = _mapper.Map<IEnumerable<StationDto>>(allStations);
      return Ok(allStationsDto);
    }

    [HttpGet("{id}")]
    public IActionResult GetById([FromRoute] int id)
    {
      var station = _stationsCacheStoreClient.GetRecordById(id);
      if (station is null)
      {
        return NotFound();
      }

      var stationDto = _mapper.Map<StationDto>(station);

      return Ok(stationDto);
    }

    [HttpGet("position/{Latitude}/{Longitude}")]
    public IActionResult GetByPosition([FromRoute] double Latitude, [FromRoute] double Longitude)
    {
      if (Latitude == 0 && Longitude == 0)
      {
        return ValidationProblem("Wrong position");
      }

      var stations = _stationsCacheStoreClient.GetAllRecords();

      var position = new Position(Longitude, Latitude);

      var nearestStation = _nearestLocationService.GetNearestStation(position, stations);

      if (nearestStation is null)
      {
        return NotFound();
      }
      var stationDto = _mapper.Map<StationDto>(nearestStation);

      return Ok(stationDto);
    }
  }
}
