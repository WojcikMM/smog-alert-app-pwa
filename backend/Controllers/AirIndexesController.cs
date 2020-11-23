using Microsoft.AspNetCore.Mvc;
using SmogAlertAPI.Dto;
using SmogAlertAPI.Dto.External;
using SmogAlertAPI.Services;
using SmogAlertAPI.Services.Cache;

namespace SmogAlertAPI.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AirIndexesController : ControllerBase
  {
    private readonly ICacheStoreClient<ExternalAirIndexDto> _airIndexesCacheStoreClient;

    public AirIndexesController(ICacheStoreClient<ExternalAirIndexDto> airIndexesCacheStoreClient)
    {
      _airIndexesCacheStoreClient = airIndexesCacheStoreClient;
    }

    [HttpGet]
    public IActionResult GetAll()
    {
      var airIndexes = _airIndexesCacheStoreClient.GetAllRecords();

      return Ok(airIndexes);
    }

    [HttpGet("{id}")]
    public IActionResult GetById(int id)
    {
      var airIndex = _airIndexesCacheStoreClient.GetRecordById(id);

      if (airIndex is null)
      {
        return NotFound();
      }

      return Ok(airIndex);
    }

  }
}
