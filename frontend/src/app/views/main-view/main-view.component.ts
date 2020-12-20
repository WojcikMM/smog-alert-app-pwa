import { Component } from '@angular/core';
import {StationDto} from '../../models/dtos/station.dto';
import {AirIndexDto} from '../../models/dtos/air-index.dto';
import {Observable, ReplaySubject} from 'rxjs';
import {AirConditionClientService} from '../../services/air-condition-client.service';
import {distinctUntilChanged, filter, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent {

  selectedLocationAirIndex$: Observable<AirIndexDto>;
  selectedLocation$: Observable<StationDto>;

  private readonly selectedLocation = new ReplaySubject<StationDto>();

  constructor(httpClientService: AirConditionClientService) {
    this.selectedLocation$ = this.selectedLocation
      .asObservable()
      .pipe(distinctUntilChanged());

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
