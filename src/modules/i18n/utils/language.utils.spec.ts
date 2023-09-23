import { Language } from '../enums';
import { getCurrentLanguage } from './language.utils';

describe('getCurrentLanguage Function', () => {
  it('should return the language from localStorage when available', () => {
    spyOn(localStorage, 'getItem').and.returnValue('"English"');
    expect(getCurrentLanguage().code).toBe(Language.English);
  });

  it('should return the first language from navigator.languages when localStorage is not set', () => {
    const originalNavigator: Navigator = window.navigator;

    Object.defineProperty(window, 'navigator', {
      value: {
        languages: [Language.Armenian, Language.English],
      },
      writable: true,
    });

    expect(getCurrentLanguage().code).toBe(Language.Armenian);

    // Restoring the original navigator object
    Object.defineProperty(window, 'navigator', {
      value: originalNavigator,
      writable: true,
    });
  });

  it('should return English when neither localStorage nor navigator provides a language', () => {
    expect(getCurrentLanguage().code).toBe(Language.English);
  });

  it('should return English when the language found is not a valid enum value', () => {
    spyOn(localStorage, 'getItem').and.returnValue('"InvalidLanguage"');
    expect(getCurrentLanguage().code).toBe(Language.English);
  });

  it('should return English when the localStorage has empty string value', () => {
    spyOn(localStorage, 'getItem').and.returnValue('""');
    expect(getCurrentLanguage().code).toBe(Language.English);
  });
});
