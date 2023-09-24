import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';
import { of } from 'rxjs';
import { StorageItem } from '../../modules';
import { TOUR_STEPS } from '../constants';
import { TourStep } from '../interfaces';
import { AppActions, AppSelectors, AppState } from '../state-management';
import { TourService } from './tour.service';

describe('TourService', () => {
  let service: TourService;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let store: jasmine.SpyObj<Store<AppState>>;
  let translateService: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', ['retrieve', 'store']);
    translateService = jasmine.createSpyObj('TranslateService', ['instant']);

    store = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.select as jasmine.SpyObj<any>)
      .withArgs(AppSelectors.GetAppDisplayedSelector)
      .and.returnValue(of(true));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.select as jasmine.SpyObj<any>)
      .withArgs(AppSelectors.GetTourInProgressSelector)
      .and.returnValue(of(false));

    TestBed.configureTestingModule({
      providers: [
        TourService,
        { provide: LocalStorageService, useValue: localStorageService },
        { provide: Store, useValue: store },
        { provide: TranslateService, useValue: translateService },
      ],
    });

    service = TestBed.inject(TourService) as TourService & { setTourSteps: () => void };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start tour if tour is not in progress and app is displayed', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    spyOn(service as any, 'setTourSteps');
    localStorageService.retrieve.and.returnValue(undefined);

    const tourOnExitSpy: jasmine.Spy<jasmine.Func> = jasmine.createSpy('onexit');
    const tourSetOptionsSpy: jasmine.Spy<jasmine.Func> = jasmine.createSpy('setOptions');
    const tourStartSpy: jasmine.Spy<jasmine.Func> = jasmine.createSpy('start');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).introJs = jasmine.createSpy().and.returnValue({
      onexit: tourOnExitSpy,
      setOptions: tourSetOptionsSpy,
      start: tourStartSpy,
    });

    // Act
    await service.startTour();

    // Assert
    expect(tourStartSpy).toHaveBeenCalled();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((service as any).setTourSteps).toHaveBeenCalled();
    expect(localStorageService.store).toHaveBeenCalledWith(StorageItem.TourCompleted, 'true');
    expect(store.dispatch).toHaveBeenCalledWith(new AppActions.SetTourInProgressAction(true));
  });

  it('should NOT start the tour if it has already been completed', () => {
    localStorageService.retrieve.and.returnValue('true');
    spyOn(service, 'startTour');
    service.checkTour();
    expect(service.startTour).not.toHaveBeenCalled();
  });

  it('should start the tour if it has not been completed', () => {
    localStorageService.retrieve.and.returnValue(undefined);
    spyOn(service, 'startTour');
    service.checkTour();
    expect(service.startTour).toHaveBeenCalled();
  });

  it('should NOT start the tour if it is already in progress', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (store.select as jasmine.SpyObj<any>)
      .withArgs(AppSelectors.GetTourInProgressSelector)
      .and.returnValue(of(true));
    service = new TourService(localStorageService, store, translateService);
    expect(localStorageService.store).not.toHaveBeenCalled();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should set the correct tour steps', async () => {
    localStorageService.retrieve.and.returnValue(undefined);

    const tourOnExitSpy: jasmine.Spy<jasmine.Func> = jasmine.createSpy('onexit');
    const tourSetOptionsSpy: jasmine.Spy<jasmine.Func> = jasmine.createSpy('setOptions');
    const tourStartSpy: jasmine.Spy<jasmine.Func> = jasmine.createSpy('start');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).introJs = jasmine.createSpy().and.returnValue({
      onexit: tourOnExitSpy,
      setOptions: tourSetOptionsSpy,
      start: tourStartSpy,
    });

    translateService.instant.and.callFake((key: string | Array<string>) => {
      return key;
    });

    await service.startTour();
    const expectedSteps = TOUR_STEPS.map((item: TourStep, index: number) => {
      return {
        element: index === 0 ? undefined : null,
        intro: item.intro,
        position: item.position,
      };
    });
    expect(tourSetOptionsSpy).toHaveBeenCalledWith({ steps: expectedSteps });
  });
});
