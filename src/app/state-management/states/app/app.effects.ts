import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { TourService } from '../../../services';
import { AppActions } from './app.actions';

@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private tourService: TourService) {}

  startTour$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AppActions.Actions.StartTour),
        tap(() => {
          this.tourService.startTour();
        })
      ),
    {
      dispatch: false,
    }
  );
}
