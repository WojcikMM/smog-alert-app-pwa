import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StationDto} from '../models/dtos/station.dto';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AirIndexDto} from '../models/dtos/air-index.dto';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AirConditionClientService {

  constructor(private readonly http: HttpClient) {
  }

  stations$(): Observable<StationDto[]> {
    return this.http.get<StationDto[]>(`${environment.apiUrl}/station/findAll`)
      .pipe(
        shareReplay(10)
      );
  }

  getAirConditionData$(stationId: number): Observable<AirIndexDto> {
    return this.http.get<AirIndexDto>(`${environment.apiUrl}/aqIndex/getIndex/${stationId}`);
  }
}
