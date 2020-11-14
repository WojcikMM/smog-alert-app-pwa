import {Component} from '@angular/core';
import {Observable, of} from 'rxjs';

export interface PointLocation {
  id: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  locations$: Observable<PointLocation[]>;

  constructor() {
    this.locations$ = of([
      {
        id: 'sample1',
        name: 'City 1'
      } as PointLocation,
      {
        id: 'sample2',
        name: 'City 2'
      } as PointLocation,
      {
        id: 'sample3',
        name: 'City 3'
      } as PointLocation,
    ]);
  }
}
