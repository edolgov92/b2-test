import { LOCATION_INITIALIZED } from '@angular/common';
import { Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getCurrentLanguage } from './language.utils';

export function translationInitializeFactory(translate: TranslateService, injector: Injector) {
  return () =>
    new Promise<null>((resolve) => {
      const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
      locationInitialized.then(() => {
        const language: string = getCurrentLanguage().code;
        translate.use(language).subscribe(
          () => {
            console.info(`Successfully initialized '${language}' language.`);
          },
          () => {
            console.error(`Problem with '${language}' language initialization.'`);
          },
          () => {
            resolve(null);
          },
        );
      });
    });
}
