import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ActionWithData, DataDto } from '../../../../../common';
import { HomeActions } from './home.actions';

@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions) {}

  updateTitle$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HomeActions.Actions.SetDataList),
        tap((action: ActionWithData<DataDto[]>) => {
          console.log(action);
        })
      ),
    {
      dispatch: false,
    }
  );
}
