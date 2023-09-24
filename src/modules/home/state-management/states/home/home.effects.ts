import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ActionWithData } from '../../../../shared';
import { DataConfig } from '../../../interfaces';
import { DataService } from '../../../services';
import { HomeActions } from './home.actions';

@Injectable()
export class HomeEffects {
  constructor(private actions$: Actions, private dataService: DataService) {}

  setDataConfig$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(HomeActions.Actions.SetDataConfig),
        tap((action: ActionWithData<DataConfig>) => {
          this.dataService.updateConfig(action.data);
        }),
      ),
    {
      dispatch: false,
    },
  );
}
