import {Component, EventEmitter, Output} from '@angular/core';
import {APP_CONSTS} from '../../app.consts';

@Component({
  selector: 'app-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.scss']
})
export class LanguageMenuComponent {
  @Output()
  languageChanged: EventEmitter<string> = new EventEmitter<string>();
  LANGUAGES = APP_CONSTS.SUPPORTED_LANGUAGES;
}
