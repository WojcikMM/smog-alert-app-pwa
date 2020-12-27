import { Component } from '@angular/core';
import {StationDto} from '../../models/dtos/station.dto';
import {AirIndexDto} from '../../models/dtos/air-index.dto';
import {Observable, ReplaySubject, timer} from 'rxjs';
import {AirConditionClientService} from '../../services/air-condition-client.service';
import {distinctUntilChanged, distinctUntilKeyChanged, filter, mergeMap, switchMap, withLatestFrom} from 'rxjs/operators';
import {ConfigurationService} from '../../services/configuration.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {

  selectedLocationAirIndex$: Observable<AirIndexDto>;
  selectedLocation$: Observable<StationDto>;
  allStations$: Observable<StationDto[]>;

  private readonly selectedLocation = new ReplaySubject<StationDto>();

  constructor(httpClientService: AirConditionClientService,
              _configurationService: ConfigurationService) {
    this.allStations$ = httpClientService.stations$();
    this.selectedLocation$ = this.selectedLocation
      .asObservable()
      .pipe(distinctUntilChanged());

    this.selectedLocationAirIndex$ = this.selectedLocation$
      .pipe(
        distinctUntilKeyChanged('id'),
        filter(station => !!station?.id),
        withLatestFrom(_configurationService.refreshRate$),
        switchMap(([station, refreshRate]) =>
          timer( refreshRate * 60000)
            .pipe(
              mergeMap(() => httpClientService.getAirConditionData$(station.id)),
            )
        )
      );
  }

  onLocationChanged(station: StationDto): void {
    this.selectedLocation.next(station);
  }

}
