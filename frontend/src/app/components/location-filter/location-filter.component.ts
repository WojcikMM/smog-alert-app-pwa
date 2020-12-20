import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {AirConditionClientService} from '../../services/air-condition-client.service';
import {StationDto} from '../../models/dtos/station.dto';
import {FormControl} from '@angular/forms';
import {Subject} from 'rxjs';
import {first, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss']
})
export class LocationFilterComponent implements OnDestroy {

  locations: StationDto[] = [];
  searchControl: FormControl;

  @Output()
  readonly locationSelectedEvent: EventEmitter<StationDto> = new EventEmitter<StationDto>();

  private allLocations: StationDto[] = [];
  private readonly _subscriptionDestroyer: Subject<void> = new Subject();

  constructor(private airConditionClientService: AirConditionClientService) {
    this.searchControl = new FormControl('');
    airConditionClientService.stations$()
      .pipe(
        first(),
        takeUntil(this._subscriptionDestroyer)
      )
      .subscribe(result => {
        this.allLocations = result;
        this.locations = result;
      });

    airConditionClientService.getNearestStation$()
      .pipe(takeUntil(this._subscriptionDestroyer))
      .subscribe(station => {
        this.searchControl.setValue(station);
      });

    this.searchControl.valueChanges
      .pipe(
        tap(val => this._handleFilter(val)),
        takeUntil(this._subscriptionDestroyer)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this._subscriptionDestroyer.next();
    this._subscriptionDestroyer.complete();
  }

  displayWithFn(station: StationDto): string {
    return station?.name || '';
  }

  private _handleFilter(searchValue: StationDto | string): void {
    if (!searchValue || typeof searchValue === 'string') {
      const lowerValue = searchValue.toLowerCase();
      this.locations = this.allLocations
        .filter(location => location.name.toLowerCase().indexOf(lowerValue) > -1)
        .slice();
    } else {
      this.locations = this.allLocations.slice();
      this.locationSelectedEvent.emit(searchValue);
    }
  }
}
