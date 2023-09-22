import { getEnumValues, StorageItem } from '../../shared';
import { LANGUAGES } from '../constants';
import { Language } from '../enums';
import { LanguageInterface } from '../interfaces';

export function getCurrentLanguage(): LanguageInterface {
  let lang: string | null = localStorage
    ? localStorage.getItem(`ngx-webstorage|${StorageItem.Language}`)
    : null;
  if (lang === '""') {
    lang = null;
  }
  if (lang) {
    lang = lang.replace(/"/g, '');
  } else {
    if (window && navigator) {
      lang = navigator.languages ? navigator.languages[0] : null;
      lang =
        lang || navigator.language || (navigator as any).browserLanguage || (navigator as any).userLanguage;
      if (lang) {
        if (lang.includes('-')) {
          lang = lang.split('-')[0];
        } else if (lang.includes('_')) {
          lang = lang.split('_')[0];
        }
      }
    }
    if (!lang) {
      lang = Language.English;
    }
  }
  if (!getEnumValues<Language>(Language).includes(lang as Language)) {
    lang = Language.English;
  }
  return LANGUAGES.find((item: LanguageInterface) => item.code === lang)!;
}
