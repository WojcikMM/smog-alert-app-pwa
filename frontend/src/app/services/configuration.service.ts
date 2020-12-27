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
    turnGeolocation: localStorage.getItem(APP_CONSTS.LOCAL_STORAGE_KEYS.TURN_GEOLOCATION) !== 'false',
    language: localStorage.getItem(APP_CONSTS.LOCAL_STORAGE_KEYS.LANGUAGE) || APP_CONSTS.SETTINGS_DEFAULTS.LANGUAGE_KEY,
    refreshRate: +(localStorage.getItem(APP_CONSTS.LOCAL_STORAGE_KEYS.REFRESH_RATE) || APP_CONSTS.SETTINGS_DEFAULTS.REFRESH_RATE)
  });

  readonly languageKey$: Observable<string>;
  readonly useGeolocation$: Observable<boolean>;
  readonly refreshRate$: Observable<number>;

  constructor() {
    this.languageKey$ = this._config.pipe(map(({language}) => language));
    this.useGeolocation$ = this._config.pipe(map(({turnGeolocation}) => turnGeolocation));
    this.refreshRate$ = this._config.pipe(map(({refreshRate}) => refreshRate));
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

  setRefreshRate(minutes: number): void {
    this._config.next({
      ...this._config.value,
      refreshRate: minutes
    });
    localStorage.setItem(APP_CONSTS.LOCAL_STORAGE_KEYS.REFRESH_RATE, `${minutes}`);
  }

  getSnapshot(): ConfigurationModel{
    return this._config.value;
  }
}
