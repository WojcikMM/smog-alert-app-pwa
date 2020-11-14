import {CityDto} from './city.dto';

export interface StationDto {
  id: number;
  stationName: string;
  gegrLat: number;
  gegrLon: number;
  city: CityDto;
  addressStreet: string;
}

