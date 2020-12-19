using System;

namespace AirTrackerAPI.Dto
{
  public class AirIndexLevel
  {
    public DateTime? IndexDate { get; set; }
    public AirIndexValue IndexValue { get; set; }
  }
}
