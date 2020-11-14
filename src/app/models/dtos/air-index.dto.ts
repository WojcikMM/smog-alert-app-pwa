import { AirIndexLevelDto } from './air-index-level.dto';

export interface AirIndexDto {
  id: number;

  c6h6IndexLevel: AirIndexLevelDto;
  c6h6SourceDataDate: string;

  coIndexLevel: AirIndexLevelDto;
  coSourceDataDate: string;

  no2IndexLevel: AirIndexLevelDto;
  no2SourceDataDate: string;

  o3IndexLevel: AirIndexLevelDto;
  o3SourceDataDate: string;

  pm10IndexLevel: AirIndexLevelDto;
  pm10SourceDataDate: string;

  pm25IndexLevel: AirIndexLevelDto;
  pm25SourceDataDate: string;

  so2IndexLevel: AirIndexLevelDto;
  so2SourceDataDate: string;


  stSourceDataDate: string;
  stIndexLevel: AirIndexLevelDto;
}
