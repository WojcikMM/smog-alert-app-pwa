import {Component, Input} from '@angular/core';
import {AirIndexValueEnum} from 'src/app/models/dtos/air-index-value.enum';

@Component({
  selector: 'app-air-index-value-text-description',
  templateUrl: './air-index-value-text-description.component.html',
  styleUrls: ['./air-index-value-text-description.component.scss']
})
export class AirIndexValueTextDescriptionComponent {

  @Input()
  indexValue: AirIndexValueEnum = AirIndexValueEnum.UNKNOWN;
}
