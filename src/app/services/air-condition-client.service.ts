import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StationDto} from '../models/dtos/station.dto';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AirIndexDto} from '../models/dtos/air-index.dto';
import {map, shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AirConditionClientService {

  constructor(private readonly http: HttpClient) {
  }

  stations$(): Observable<StationDto[]> {
    return this.http.get<any>(`${environment.apiUrl}/station/findAll`)
      .pipe(
        map(res => this._getContent<StationDto[]>(res)),
        shareReplay(10)
      );
  }

  getAirConditionData$(stationId: number): Observable<AirIndexDto> {
    return this.http.get(`${environment.apiUrl}/aqindex/getIndex/${stationId}`)
      .pipe(
        map(res => this._getContent<AirIndexDto>(res)),
        shareReplay(3, 30)
      );
  }

  private _getContent<T>(res: any): T {
    if (!!res?.contents) {
      return JSON.parse(res.contents) as T;
    }
    return {} as T;
  }
}
