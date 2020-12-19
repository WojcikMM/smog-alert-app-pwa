namespace AirTrackerAPI.Dto.External
{
  public class ExternalStationDto
  {
    public int Id { get; set; }
    public string StationName { get; set; }
    public double GegrLat { get; set; }
    public double GegrLon { get; set; }
    public string AddressStreet { get; set; }
    public ExternalCityDto City { get; set; }
    
  }

  public class ExternalCityDto
  {
    public int Id { get; set; }
    public string Name { get; set; }
    public ExternalComuneDto Commune { get; set; }
  }

  public class ExternalComuneDto
  {
    public string CommuneName { get; set; }
    public string DistrictName { get; set; }
    public string ProvinceName { get; set; }
  }

}
