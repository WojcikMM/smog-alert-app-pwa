import {Component, EventEmitter, Output} from '@angular/core';
import {AirConditionClientService} from '../../services/air-condition-client.service';
import {StationDto} from '../../models/dtos/station.dto';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-location-filter',
  templateUrl: './location-filter.component.html',
  styleUrls: ['./location-filter.component.scss']
})
export class LocationFilterComponent {

  allLocations: StationDto[] = [];
  locations: StationDto[] = [];
  searchControl: FormControl;

  @Output()
  readonly locationSelectedEvent: EventEmitter<StationDto> = new EventEmitter<StationDto>();

  constructor(private airConditionClientService: AirConditionClientService) {
    this.searchControl = new FormControl('');
    airConditionClientService.stations$()
      .subscribe(result => {
        this.allLocations = result;
        this.locations = result;
      });

    airConditionClientService.getNearestStation$().subscribe((station) => {
      console.log('sss');
      this.searchControl.setValue(station.name);
      this.onOptionSelected(station.name);
    });

    this.searchControl.valueChanges.subscribe(value => {
      const lowerValue = value?.toLowerCase() || '';
      console.log(lowerValue);
      this.locations = !value ?
        this.allLocations.slice() :
        [...this.allLocations.filter(location => location.name.toLowerCase().indexOf(lowerValue) > -1)];
    });
  }

  onOptionSelected(stationName: string): void {
    const selectedStation = this.locations.find(x => x.name === stationName);
    this.locationSelectedEvent.emit(selectedStation);
  }

  onResetClicked(): void {
    this.searchControl.setValue('');
    this.locationSelectedEvent.emit();
  }
}
