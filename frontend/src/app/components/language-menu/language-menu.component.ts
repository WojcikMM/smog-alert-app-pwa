import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-language-menu',
  templateUrl: './language-menu.component.html',
  styleUrls: ['./language-menu.component.scss']
})
export class LanguageMenuComponent {
  @Output()
  languageChanged: EventEmitter<string> = new EventEmitter<string>();
  LANGUAGES = [ 'en', 'pl' ];
}
