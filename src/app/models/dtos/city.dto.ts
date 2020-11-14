import {CommuneDto} from './commune.dto';

export interface CityDto {
    id: number;
    name: string;
    commune: CommuneDto;
}
