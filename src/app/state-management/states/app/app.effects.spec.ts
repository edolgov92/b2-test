import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TourService } from '../../../services';
import { AppActions } from './app.actions';
import { AppEffects } from './app.effects';

describe('AppEffects', () => {
  let actions$: Observable<Action>;
  let effects: AppEffects;
  let tourService: jasmine.SpyObj<TourService>;

  beforeEach(() => {
    tourService = jasmine.createSpyObj('TourService', ['startTour']);

    TestBed.configureTestingModule({
      providers: [
        AppEffects,
        provideMockActions(() => actions$),
        { provide: TourService, useValue: tourService },
      ],
    });

    effects = TestBed.inject(AppEffects);
  });

  it('should call TourService.startTour when StartTour action is dispatched', (done: DoneFn) => {
    actions$ = of(new AppActions.StartTourAction());

    effects.startTour$.subscribe(() => {
      expect(tourService.startTour).toHaveBeenCalled();
      done();
    });
  });
});
