import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeEn from '@angular/common/locales/en';
import localeHy from '@angular/common/locales/hy';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ITranslationResource, MultiTranslateHttpLoader } from 'ngx-translate-multi-http-loader';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { getCurrentLanguage, Language, LanguageInterface, LANGUAGES, SharedModule } from '../modules';
import { AppRoutingModule } from './app-routing.module';
import * as Components from './components';
import * as Services from './services';
import { AppActions, AppEffects, appReducer, AppState } from './state-management';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const localesMap: Map<Language, any> = new Map([
  [Language.Armenian, localeHy],
  [Language.English, localeEn],
]);

let language: LanguageInterface = getCurrentLanguage();
if (!localesMap.has(language.code as Language)) {
  language = LANGUAGES.find((item: LanguageInterface) => item.code === Language.English)!;
}
const lang: string = language.code;
registerLocaleData(localesMap.get(language.code as Language));

export function createTranslateLoader(http: HttpClient) {
  const version: string = '1.0';
  const resources: ITranslationResource[] = [
    { prefix: `assets/i18n/${lang}/app.`, suffix: '.json' },
    { prefix: `assets/i18n/${lang}/home.`, suffix: '.json' },
  ];
  resources.forEach((resource: ITranslationResource) => {
    resource.suffix += `?v${version}`;
  });
  return new MultiTranslateHttpLoader(http, resources);
}

@NgModule({
  declarations: [Components.AppComponent, Components.SettingsComponent, Components.SplashScreenComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    EffectsModule.forRoot(AppEffects),
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    SharedModule,
    StoreModule.forRoot({ app: appReducer } as ActionReducerMap<AppState, AppActions.AppActionsType>),
    TranslateModule.forRoot({
      defaultLanguage: lang,
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [Services.LocationService, Services.TourService],
  bootstrap: [Components.AppComponent],
})
export class AppModule {}
