import {Component} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
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

  private readonly selectedLocation = new ReplaySubject<StationDto>();

  constructor(httpClientService: AirConditionClientService) {
    this.selectedLocation$ = this.selectedLocation.asObservable().pipe(distinctUntilChanged());

    this.selectedLocationAirIndex$ = this.selectedLocation$
      .pipe(
        filter(station => !!station?.id),
        switchMap((station) => httpClientService.getAirConditionData$(station.id))
      );
  }

  onLocationChanged(station: StationDto): void {
    this.selectedLocation.next(station);
  }
}
