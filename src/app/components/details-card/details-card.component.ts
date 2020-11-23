import {Component, Input, OnInit} from '@angular/core';
import {AirIndexDto} from '../../models/dtos/air-index.dto';
import {StationDto} from '../../models/dtos/station.dto';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss']
})
export class DetailsCardComponent implements OnInit {

  @Input()
  airIndex!: AirIndexDto | null;

  @Input()
  selectedLocation!: StationDto | null;

  constructor() { }

  ngOnInit(): void {
  }

}
