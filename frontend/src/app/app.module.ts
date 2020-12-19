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
import {AirConditionLevelPipe} from './pipes/air-condition-level.pipe';
import { AirIndexValueTextDescriptionComponent } from './components/air-index-value-text-description/air-index-value-text-description.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LocationFilterComponent,
    DetailsCardComponent,
    AirConditionLevelPipe,
    AirIndexValueTextDescriptionComponent
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
      defaultLanguage: 'en-US',
      useDefaultLang: true,
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory), // TODO: try just TranslateHttpLoader
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [
    {
      provide: POSITION_OPTIONS,
      useValue: {enableHighAccuracy: true, timeout: 3000, maximumAge: 1000},
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
