import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {StationDto} from '../models/dtos/station.dto';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {AirIndexDto} from '../models/dtos/air-index.dto';
import {distinctUntilChanged, map, mergeMap, shareReplay} from 'rxjs/operators';
import {GeolocationService} from '@ng-web-apis/geolocation';
import {APP_CONSTS} from '../app.consts';

@Injectable({
  providedIn: 'root'
})
export class AirConditionClientService {

  constructor(private readonly http: HttpClient,
              private readonly geolocation$: GeolocationService) {
  }

  stations$(): Observable<StationDto[]> {
    return this.http.get<StationDto[]>(`${environment.apiUrl}/stations`)
      .pipe(shareReplay(10));
  }

  getAirConditionData$(stationId: number): Observable<AirIndexDto> {
    return this.http.get<AirIndexDto>(`${environment.apiUrl}/AirIndexes/${stationId}`)
      .pipe(shareReplay(3, 30));
  }

  getNearestStationByPosition$(longitude: number, latitude: number): Observable<StationDto> {
    return this.http.get<StationDto>(`${environment.apiUrl}/stations/position/${latitude}/${longitude}`);
  }

  getNearestStation$(): Observable<StationDto> {
    return this.geolocation$.pipe(
      map(({coords}) => coords),
      distinctUntilChanged((prev: Coordinates, next: Coordinates) => {
        const fractionDigitsIgnore = APP_CONSTS.GLOBALISATION.FRACTION_DIGITS_IGNORE;
        return prev?.latitude.toFixed(fractionDigitsIgnore) === next.latitude?.toFixed(fractionDigitsIgnore) &&
          prev.altitude?.toFixed(fractionDigitsIgnore) === next.altitude?.toFixed(fractionDigitsIgnore);
      }),
      mergeMap(coords => this.getNearestStationByPosition$(coords.longitude, coords.latitude))
    );
  }
}
