namespace AirTrackerAPI.Dto
{

  public class AirIndexDto
  {
    public int Id { get; set; }
    public AirIndexLevel Summary { get; set; }
    // C6H6
    public AirIndexLevel Benzene { get; set; }
    public AirIndexLevel SO2 { get; set; }
    public AirIndexLevel CO { get; set; }
    public AirIndexLevel O3 { get; set; }
    public AirIndexLevel PM10 { get; set; }
    public AirIndexLevel PM25 { get; set; }
    public AirIndexLevel NO2 { get; set; }
  }
}
