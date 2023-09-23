import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { LocalStorageService } from 'ngx-webstorage';
import 'reflect-metadata';
import { SharedModule } from '../../../modules';
import { LocationService } from '../../services';
import { AppActions } from '../../state-management';
import { SettingsComponent } from '../settings/settings.component';
import { SplashScreenComponent } from '../splash-screen/splash-screen.component';
import {
  APP_READY_TIMEOUT_MS,
  APP_SHOW_TIMEOUT_MS,
  AppComponent,
  SPLASH_SCREEN_HIDE_TIMEOUT_MS,
  State,
} from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let componentElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [AppComponent, SettingsComponent, SplashScreenComponent],
      providers: [
        LocationService,
        provideMockStore(),
        {
          provide: LocalStorageService,
          useValue: {
            store: () => {},
          },
        },
      ],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
  });

  it('should create the AppComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have DisplayingSplashScreen as initial state', () => {
    expect(component.state$.value).toEqual(State.DisplayingSplashScreen);
  });

  it('should change state$ to HidingSplashScreen after timeout', fakeAsync(() => {
    component.ngAfterViewInit();
    tick(SPLASH_SCREEN_HIDE_TIMEOUT_MS);
    expect(component.state$.value).toEqual(State.HidingSplashScreen);
    discardPeriodicTasks();
  }));

  it('should change state$ to DisplayingApp after timeout', fakeAsync(() => {
    component.ngAfterViewInit();
    tick(SPLASH_SCREEN_HIDE_TIMEOUT_MS + APP_SHOW_TIMEOUT_MS);
    expect(component.state$.value).toEqual(State.DisplayingApp);
    discardPeriodicTasks();
  }));

  it('should dispatch SetAppDisplayedAction after timeout', fakeAsync(() => {
    const store: Store = TestBed.inject(Store);
    spyOn(store, 'dispatch');
    component.ngAfterViewInit();
    tick(SPLASH_SCREEN_HIDE_TIMEOUT_MS + APP_SHOW_TIMEOUT_MS + APP_READY_TIMEOUT_MS);
    expect(store.dispatch).toHaveBeenCalledWith(new AppActions.SetAppDisplayedAction(true));
    discardPeriodicTasks();
  }));

  it('should start the app after view initialization', fakeAsync(() => {
    spyOn(component, 'startApp');
    component.ngAfterViewInit();
    expect(component.startApp).toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it('should apply display class to splash screen when state is DisplayingSplashScreen', () => {
    component.state$.next(State.DisplayingSplashScreen);
    fixture.detectChanges();
    const splashElement: HTMLElement = fixture.nativeElement.querySelector('app-splash-screen');
    expect(splashElement.classList).toContain('display');
  });

  it('should apply hide class to splash screen when state is HidingSplashScreen', () => {
    component.state$.next(State.HidingSplashScreen);
    fixture.detectChanges();
    const splashElement: HTMLElement = fixture.nativeElement.querySelector('app-splash-screen');
    expect(splashElement.classList).toContain('hide');
  });

  it('should apply display class to router when state is DisplayingApp', () => {
    component.state$.next(State.DisplayingApp);
    fixture.detectChanges();
    const routerElement: HTMLElement = fixture.nativeElement.querySelector('.router');
    expect(routerElement.classList).toContain('display');
  });

  it('should render app-splash-screen, router-outlet, and app-settings in the DOM', () => {
    fixture.detectChanges();
    expect(componentElement.querySelector('app-splash-screen')).toBeTruthy();
    expect(componentElement.querySelector('router-outlet')).toBeTruthy();
    expect(componentElement.querySelector('app-settings')).toBeTruthy();
  });
});
