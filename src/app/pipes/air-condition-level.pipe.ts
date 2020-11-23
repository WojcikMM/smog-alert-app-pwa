import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'airConditionLevel'
})
export class AirConditionLevelPipe implements PipeTransform {

  transform(value?: number, ...args: unknown[]): unknown {
    switch (value) {
      case 0: return 'Excellent';
      case 1: return 'Good';
      case 2: return '2';
      default: return 'No Data';
    }
  }

}
