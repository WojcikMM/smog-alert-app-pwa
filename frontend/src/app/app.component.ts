import {Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private readonly _translate: TranslateService) {
  }
  onLanguageChanged(languageId: string): void {
    this._translate.use(languageId);
  }
}
