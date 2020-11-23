namespace SmogAlertAPI.Services
{
  public class Position
  {
    public Position(double Longitude, double Latitude)
    {
      this.Longitude = Longitude;
      this.Latitude = Latitude;
    }
    public double Longitude { get; set; }
    public double Latitude { get; set; }
  }
}
