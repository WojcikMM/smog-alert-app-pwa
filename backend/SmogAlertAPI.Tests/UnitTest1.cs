using AutoMapper;
using Newtonsoft.Json;
using NUnit.Framework;
using SmogAlertAPI.Dto;
using SmogAlertAPI.Dto.External;
using SmogAlertAPI.Mapper;
using System;

namespace SmogAlertAPI.Tests
{
  public class Tests
  {
    private IMapper mapper;
    private ExternalAirIndexDto externalAirIndexDto;

    [SetUp]
    public void Setup()
    {
      mapper = new MapperConfiguration(cfg => { cfg.AddProfile<MapperProfile>(); }).CreateMapper();

      externalAirIndexDto = new ExternalAirIndexDto
      {
        Id = 22,

        StSourceDataDate = DateTime.Now,
        StIndexLevel = new ExternalIndexLevel
        {
          Id = -1,
          IndexLevelName = "Sample"
        },
        StCalcDate = null,

        CoSourceDataDate = DateTime.Now,
        CoIndexLevel = new ExternalIndexLevel
        {
          Id = -1,
          IndexLevelName = "Sample"
        },
        CoCalcDate = null,


        O3SourceDataDate = new DateTime(1999,1,1),
        O3IndexLevel = new ExternalIndexLevel
        {
          Id = 5,
          IndexLevelName = "Sample"
        },
        O3CalcDate = null,

      };

    }

    [Test]
    public void Test1()
    {
      

      var result = mapper.Map<AirIndexDto>(externalAirIndexDto);

      Console.WriteLine(JsonConvert.SerializeObject(result));
      Assert.IsNotNull(result.CO.IndexValue);
    }
  }
}
