using System;

namespace SmogAlertAPI.Dto.External
{
  public class ExternalAirIndexDto
  {
    public int Id { get; set; }
    public string StCalcDate { get; set; }
    public ExternalIndexLevel StIndexLevel { get; set; }
    public DateTime? StSourceDataDate { get; set; }
    public string So2CalcDate { get; set; }
    public ExternalIndexLevel So2IndexLevel { get; set; }
    public DateTime? So2SourceDataDate { get; set; }
    public string No2CalcDate { get; set; }
    public ExternalIndexLevel No2IndexLevel { get; set; }
    public DateTime? No2SourceDataDate { get; set; }
    public string CoCalcDate { get; set; }
    public ExternalIndexLevel CoIndexLevel { get; set; }
    public DateTime? CoSourceDataDate { get; set; }
    public string Pm10CalcDate { get; set; }
    public ExternalIndexLevel Pm10IndexLevel { get; set; }
    public DateTime? Pm10SourceDataDate { get; set; }
    public string Pm25CalcDate { get; set; }
    public ExternalIndexLevel Pm25IndexLevel { get; set; }
    public DateTime? Pm25SourceDataDate { get; set; }
    public string O3CalcDate { get; set; }
    public ExternalIndexLevel O3IndexLevel { get; set; }
    public DateTime? O3SourceDataDate { get; set; }
    public string C6h6CalcDate { get; set; }
    public ExternalIndexLevel C6h6IndexLevel { get; set; }
    public DateTime? C6h6SourceDataDate { get; set; }
  }
}
