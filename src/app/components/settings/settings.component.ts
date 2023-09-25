import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs';
import { Language, LanguageInterface, LANGUAGES } from '../../../modules/i18n';
import { getEnumValues, StorageItem } from '../../../modules/shared';
import { LocationService } from '../../services';
import { AppActions } from '../../state-management';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  switchLanguageSubmenuOpened$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  languages: LanguageInterface[];

  constructor(
    private localStorageService: LocalStorageService,
    private locationService: LocationService,
    private store: Store,
  ) {
    this.languages = getEnumValues<Language>(Language).map((language: Language) => {
      return LANGUAGES.find((item: LanguageInterface) => item.code === language)!;
    });
  }

  /**
   * Opens submenu to swith current language
   */
  openSwitchLanguageSubmenu(event: MouseEvent): void {
    if (!this.switchLanguageSubmenuOpened$.value) {
      this.switchLanguageSubmenuOpened$.next(true);
    }
    // In template a tag is used, and after opening submenu we need to avoid
    // page reload and void hiding menu element
    event.stopPropagation();
    event.preventDefault();
  }

  /**
   * Closes swith language submenu to return back to main menu
   */
  closeSwitchLanguageSubmenu(event: MouseEvent, keepMenu: boolean): void {
    if (this.switchLanguageSubmenuOpened$.value) {
      this.switchLanguageSubmenuOpened$.next(false);
    }
    if (keepMenu) {
      // In template a tag is used, and after closing submenu we need to avoid
      // page reload and void hiding menu element
      event.stopPropagation();
      event.preventDefault();
    }
  }

  /**
   * Sets new language in local storage and reloads page to apply new changes
   */
  selectLanguage(language: LanguageInterface): void {
    this.localStorageService.store(StorageItem.Language, language.code);
    this.locationService.reload();
  }

  /**
   * Starts intro tour in app
   */
  startTour(event: MouseEvent): void {
    this.store.dispatch(new AppActions.StartTourAction());
    event.preventDefault();
  }
}
