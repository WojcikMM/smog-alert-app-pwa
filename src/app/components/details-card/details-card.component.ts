import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {AirIndexDto} from '../../models/dtos/air-index.dto';
import {StationDto} from '../../models/dtos/station.dto';

@Component({
  selector: 'app-details-card',
  templateUrl: './details-card.component.html',
  styleUrls: ['./details-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsCardComponent {

  @Input()
  airIndex?: AirIndexDto | null;

  @Input()
  selectedLocation?: StationDto | null;

}
