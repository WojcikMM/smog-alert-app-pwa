using System;

namespace SmogAlertAPI.Dto
{
  public class AirIndexLevel
  {
    public DateTime? IndexDate { get; set; }
    public AirIndexValue IndexValue { get; set; }
  }
}
