import {Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {ConfigurationService} from './services/configuration.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private readonly _translate: TranslateService,
              private readonly _configurationService: ConfigurationService) {
    _configurationService.languageKey$.subscribe(key => {
      this._translate.use(key);
    });
  }
  onLanguageChanged(languageId: string): void {
    this._configurationService.setLanguageKey(languageId);
  }
}
