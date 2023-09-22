import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';
import { getEnumValues, StorageItem } from '../../../shared';
import { LANGUAGES } from '../../constants';
import { Language } from '../../enums';
import { LanguageInterface } from '../../interfaces';

@Component({
  selector: 'in-switch-language-popover',
  templateUrl: 'switch-language-popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchLanguagePopoverComponent {
  languages: LanguageInterface[];

  constructor(private localStorageService: LocalStorageService) {
    this.languages = getEnumValues<Language>(Language).map((language: Language) => {
      return LANGUAGES.find((item: LanguageInterface) => item.code === language)!;
    });
  }

  close(): void {
    // this.popoverController.dismiss();
  }

  selectLanguage(language: LanguageInterface): void {
    this.localStorageService.store(StorageItem.Language, language.code);
    location.reload();
  }
}
