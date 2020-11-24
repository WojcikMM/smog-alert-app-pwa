using System;

namespace SmogAlertAPI.Dto
{

  public enum AirIndexValue
  {
    UNKNOWN = -1,
    NO_VALUE = 0,
    VERRY_BAD = 1,
    BAD = 2,
    SUFFICIENT = 3,
    MODERATE = 4,
    GOOD = 5,
    VERY_GOOD = 6,
  }

  public class AirIndexDto
  {
    public int Id { get; set; }
    public AirIndexType Summary { get; set; }
    // C6H6
    public AirIndexType Benzene { get; set; }
    public AirIndexType SO2 { get; set; }
    public AirIndexType CO { get; set; }
    public AirIndexType O3 { get; set; }
    public AirIndexType PM10 { get; set; }
    public AirIndexType PM25 { get; set; }
    public AirIndexType NO2 { get; set; }
  }

  public class AirIndexType
  {
    public DateTime? IndexDate { get; set; }
    public AirIndexValue IndexValue { get; set; }
  }
}
