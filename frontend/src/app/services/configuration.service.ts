import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {APP_CONSTS} from '../app.consts';
import {ConfigurationModel} from '../models/configuration.model';


@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  private readonly _config = new BehaviorSubject<ConfigurationModel>({
    turnGeolocation: localStorage.getItem(APP_CONSTS.LOCAL_STORAGE_KEYS.TURN_GEOLOCATION) === 'true',
    language: localStorage.getItem(APP_CONSTS.LOCAL_STORAGE_KEYS.LANGUAGE) || 'pl'
  });

  readonly languageKey$: Observable<string>;
  readonly useGeolocation$: Observable<boolean>;

  constructor() {
    this.languageKey$ = this._config.pipe(map(({language}) => language));
    this.useGeolocation$ = this._config.pipe(map(({turnGeolocation}) => turnGeolocation));
  }

  setUseGeolocation(useGeolocationValue: boolean): void {
    this._config.next({
      ...this._config.value,
      turnGeolocation: useGeolocationValue
    });
    localStorage.setItem(APP_CONSTS.LOCAL_STORAGE_KEYS.TURN_GEOLOCATION, `${useGeolocationValue}`);
  }

  setLanguageKey(langKey: string): void {
    this._config.next({
      ...this._config.value,
      language: langKey
    });
    localStorage.setItem(APP_CONSTS.LOCAL_STORAGE_KEYS.LANGUAGE, langKey);
  }
}
