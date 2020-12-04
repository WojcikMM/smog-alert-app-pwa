import {Component} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {filter, map, switchMap} from 'rxjs/operators';
import {AirConditionClientService} from './services/air-condition-client.service';
import {AirIndexDto} from './models/dtos/air-index.dto';
import {StationDto} from './models/dtos/station.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  selectedLocationAirIndex$: Observable<AirIndexDto>;
  selectedLocation$: Observable<StationDto>;

  private readonly selectedLocation = new Subject<StationDto>();

  constructor(httpClientService: AirConditionClientService) {
    this.selectedLocation$ = this.selectedLocation.asObservable();
    this.selectedLocationAirIndex$ = this.selectedLocation$
      .pipe(
        map(station => station.id),
        filter(stationId => !!stationId),
        switchMap((stationId) => httpClientService.getAirConditionData$(stationId))
      );
  }

  onLocationChanged(locationId: StationDto): void {
    this.selectedLocation.next(locationId);
  }
}
