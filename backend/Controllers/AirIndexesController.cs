using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using SmogAlertAPI.Dto;
using SmogAlertAPI.Dto.External;
using SmogAlertAPI.Services.Cache;
using System.Collections.Generic;

namespace SmogAlertAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AirIndexesController : ControllerBase
  {
    private readonly ICacheStoreClient<ExternalAirIndexDto> _airIndexesCacheStoreClient;
    private readonly IMapper _mapper;

    public AirIndexesController(ICacheStoreClient<ExternalAirIndexDto> airIndexesCacheStoreClient, IMapper mapper)
    {
      _airIndexesCacheStoreClient = airIndexesCacheStoreClient;
      _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
      var externalAirIndexes = _airIndexesCacheStoreClient.GetAllRecords();
      var airIndexes = _mapper.Map<IEnumerable<AirIndexDto>>(externalAirIndexes);

      return Ok(airIndexes);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      var externalAirIndex = _airIndexesCacheStoreClient.GetRecordById(id);

      if (externalAirIndex is null)
      {
        return NotFound();
      }

      var airIndex = _mapper.Map<AirIndexDto>(externalAirIndex);

      return Ok(airIndex);
    }

  }
}
