import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {ServiceWorkerModule} from '@angular/service-worker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTableModule} from '@angular/material/table';

import {POSITION_OPTIONS} from '@ng-web-apis/geolocation';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {LocationFilterComponent} from './components/location-filter/location-filter.component';
import {DetailsCardComponent} from './components/details-card/details-card.component';
import {AirIndexValueTextDescriptionComponent} from './components/air-index-value-text-description/air-index-value-text-description.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {LanguageMenuComponent} from './components/language-menu/language-menu.component';
import {MatMenuModule} from '@angular/material/menu';
import {SettingsViewComponent} from './views/settings-view/settings-view.component';
import {MainViewComponent} from './views/main-view/main-view.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {APP_CONSTS} from './app.consts';
import {MatTooltipModule} from '@angular/material/tooltip';

export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, APP_CONSTS.TRANSLATIONS_KEY_PREFIX);
}

@NgModule({
  declarations: [
    AppComponent,
    LocationFilterComponent,
    DetailsCardComponent,
    AirIndexValueTextDescriptionComponent,
    LanguageMenuComponent,
    SettingsViewComponent,
    MainViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatAutocompleteModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory), // TODO: try just TranslateHttpLoader
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register(environment.serviceWorkerName, {enabled: environment.production}),
    MatMenuModule,
    MatSlideToggleModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: POSITION_OPTIONS,
      useValue: {enableHighAccuracy: true, timeout: 3000, maximumAge: 30000},
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
