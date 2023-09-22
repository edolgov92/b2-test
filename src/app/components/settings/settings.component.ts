import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs';
import { Language, LanguageInterface, LANGUAGES } from '../../../modules/i18n';
import { getEnumValues, StorageItem } from '../../../modules/shared';
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

  constructor(private localStorageService: LocalStorageService, private store: Store) {
    this.languages = getEnumValues<Language>(Language).map((language: Language) => {
      return LANGUAGES.find((item: LanguageInterface) => item.code === language)!;
    });
  }

  openSwitchLanguageSubmenu(event: MouseEvent): void {
    if (!this.switchLanguageSubmenuOpened$.value) {
      this.switchLanguageSubmenuOpened$.next(true);
    }
    event.stopPropagation();
    event.preventDefault();
  }

  closeSwitchLanguageSubmenu(event: MouseEvent, keepMenu: boolean): void {
    if (this.switchLanguageSubmenuOpened$.value) {
      this.switchLanguageSubmenuOpened$.next(false);
    }
    if (keepMenu) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  selectLanguage(language: LanguageInterface): void {
    this.localStorageService.store(StorageItem.Language, language.code);
    location.reload();
  }

  startTour(event: MouseEvent): void {
    this.store.dispatch(new AppActions.StartTourAction());
    event.preventDefault();
  }
}
