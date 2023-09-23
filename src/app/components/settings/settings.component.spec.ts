import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { LocalStorageService } from 'ngx-webstorage';
import { LanguageInterface } from '../../../modules/i18n';
import { LocationService } from '../../services';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let fixture: ComponentFixture<SettingsComponent>;
  let component: SettingsComponent;
  let componentElement: HTMLElement;
  let localStorageService: Partial<LocalStorageService> = {
    store: jasmine.createSpy('store'),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SettingsComponent],
      providers: [
        LocationService,
        provideMockStore(),
        {
          provide: LocalStorageService,
          useValue: localStorageService,
        },
      ],
    });
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
  });

  it('should create the SettingsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display main menu items by default', () => {
    component.switchLanguageSubmenuOpened$.next(false);
    fixture.detectChanges();
    const mainMenuItems: NodeListOf<Element> = componentElement.querySelectorAll('.dropdown-item');
    expect(mainMenuItems.length).toEqual(2);
  });

  it('should display language submenu items when switchLanguageSubmenuOpened$ is true', () => {
    component.switchLanguageSubmenuOpened$.next(true);
    fixture.detectChanges();
    const languageMenuItems: NodeListOf<Element> = componentElement.querySelectorAll('.dropdown-item');
    expect(languageMenuItems.length).toEqual(component.languages.length + 1);
  });

  it('should call the correct methods on menu item click', () => {
    component.switchLanguageSubmenuOpened$.next(false);
    fixture.detectChanges();

    spyOn(component, 'openSwitchLanguageSubmenu');
    spyOn(component, 'closeSwitchLanguageSubmenu');
    spyOn(component, 'selectLanguage');
    spyOn(component, 'startTour');

    let menuItem: DebugElement = fixture.debugElement.query(By.css('.dropdown-item'));
    menuItem.triggerEventHandler('click', new MouseEvent('click'));
    expect(component.openSwitchLanguageSubmenu).toHaveBeenCalled();

    // Close language submenu
    component.switchLanguageSubmenuOpened$.next(true);
    fixture.detectChanges();
    menuItem = fixture.debugElement.queryAll(By.css('.dropdown-item'))[component.languages.length];
    menuItem.triggerEventHandler('click', new MouseEvent('click'));
    expect(component.closeSwitchLanguageSubmenu).toHaveBeenCalled();

    // Select language
    menuItem = fixture.debugElement.query(By.css('.dropdown-item'));
    menuItem.triggerEventHandler('click', new MouseEvent('click'));
    expect(component.selectLanguage).toHaveBeenCalled();

    // Start tour
    component.switchLanguageSubmenuOpened$.next(false);
    fixture.detectChanges();
    menuItem = fixture.debugElement.queryAll(By.css('.dropdown-item'))[1];
    menuItem.triggerEventHandler('click', new MouseEvent('click'));
    expect(component.startTour).toHaveBeenCalled();
  });

  it('should store the selected language and reload the location', () => {
    const language: LanguageInterface = {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      nativeShortName: 'en',
      locale: 'en-US',
    };
    const locationService: LocationService = TestBed.inject(LocationService);
    spyOn(locationService, 'reload');
    component.selectLanguage(language);
    expect(localStorageService.store).toHaveBeenCalledWith('b2-language', 'en');
    expect(locationService.reload).toHaveBeenCalled();
  });
});
