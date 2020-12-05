import {Pipe, PipeTransform} from '@angular/core';
import {AirIndexValueEnum} from '../models/dtos/air-index-value.enum';

@Pipe({
  name: 'airConditionLevel'
})
export class AirConditionLevelPipe implements PipeTransform {

  transform(value?: AirIndexValueEnum): string {
    switch (value) {
      case AirIndexValueEnum.NO_VALUE:
        return 'No data';
      case AirIndexValueEnum.VERY_BAD:
        return 'Very bad';
      case AirIndexValueEnum.BAD:
        return 'Bad';
      case AirIndexValueEnum.SUFFICIENT:
        return 'Sufficient';
      case AirIndexValueEnum.MODERATE:
        return 'Moderate';
      case AirIndexValueEnum.GOOD:
        return 'Good';
      case AirIndexValueEnum.VERY_GOOD:
        return 'Very good';
      default:
        return '-';
    }
  }

}
