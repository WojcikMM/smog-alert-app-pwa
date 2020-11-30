import {AirIndexLevelDto} from './air-index-level.dto';

export interface AirIndexDto {
  id: number;
  summary: AirIndexLevelDto;
  benzene: AirIndexLevelDto;
  so2: AirIndexLevelDto;
  co: AirIndexLevelDto;
  o3: AirIndexLevelDto;
  pm10: AirIndexLevelDto;
  pm25: AirIndexLevelDto;
  no2: AirIndexLevelDto;
}

