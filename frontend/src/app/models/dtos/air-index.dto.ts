import {AirIndexLevelDto} from './air-index-level.dto';

export interface AirIndexDto {
  id: number;
  summary: AirIndexLevelDto;
  benzene: AirIndexLevelDto;
  sO2: AirIndexLevelDto;
  co: AirIndexLevelDto;
  o3: AirIndexLevelDto;
  pM10: AirIndexLevelDto;
  pM25: AirIndexLevelDto;
  nO2: AirIndexLevelDto;
}

