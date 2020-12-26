import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {AirConditionClientService} from '../../services/air-condition-client.service';
import {StationDto} from '../../models/dtos/station.dto';
import {FormControl} from '@angular/forms';
import {Observable, of, Subject} from 'rxjs';
import {map, switchMap, takeUntil, tap} from 'rxjs/operators';
import {ConfigurationService} from '../../services/configuration.service';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss']
})
export class LocationFilterComponent implements OnDestroy {
  readonly searchControl: FormControl;
  readonly filteredStations$: Observable<StationDto[]>;


  @Input()
  get allStations(): StationDto[] | null {
    return this._allStations;
  }

  set allStations(val: StationDto[] | null) {
    this._allStations = val || [];
    this.searchControl.updateValueAndValidity();
  }

  @Output()
  readonly locationSelectedEvent: EventEmitter<StationDto> = new EventEmitter<StationDto>();

  private _allStations: StationDto[] = [];
  private readonly _subscriptionDestroyer: Subject<void> = new Subject();

  constructor(private airConditionClientService: AirConditionClientService,
              readonly configurationService: ConfigurationService) {
    this.searchControl = new FormControl('');

    this.filteredStations$ = this.searchControl.valueChanges
      .pipe(map(val => this._handleFilter(val)));

    this.configurationService.useGeolocation$
      .pipe(
        switchMap(useGeolocation => useGeolocation ? airConditionClientService.getNearestStation$() : of(null)),
        tap(station => {
          if (!!station) {
            this.searchControl.setValue(station);
          }
        }),
        takeUntil(this._subscriptionDestroyer)
      ).subscribe();
  }

  ngOnDestroy(): void {
    this._subscriptionDestroyer.next();
    this._subscriptionDestroyer.complete();
  }

  displayWithFn(station: StationDto): string {
    return station?.name || '';
  }

  private _handleFilter(searchValue: StationDto | string): StationDto[] {
    if (typeof searchValue === 'string') {
      const lowerValue = searchValue.toLowerCase();
      return this._allStations
        .filter(location => location.name.toLowerCase().indexOf(lowerValue) > -1)
        .slice();
    } else {
      this.locationSelectedEvent.emit(searchValue);
      return this._allStations.slice();
    }
  }
}
