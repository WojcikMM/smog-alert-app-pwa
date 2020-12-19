using AirTrackerAPI.Dto.External;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AirTrackerAPI.Services
{
  public class NearestLocationService
  {

    public ExternalStationDto GetNearestStation(Position currentPosition, IEnumerable<ExternalStationDto> stations)
    {

      var calculatedDistance = stations.Select(station => new
      {
        Distance = LocationDistance(currentPosition, station),
        Station = station
      });

      var minimunDistance = calculatedDistance.Min(x=> x.Distance);

      return calculatedDistance.FirstOrDefault(x => x.Distance == minimunDistance)?.Station;
    }


    private double LocationDistance(Position actualPosition, ExternalStationDto station)
    {
      var dx = actualPosition.Latitude - station.GegrLat;
      var dy = actualPosition.Longitude - station.GegrLon;

      return Math.Sqrt((dx * dx + dy * dy));
    }
  }
}
