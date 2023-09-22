import { Action } from '@ngrx/store';
import { ActionWithData } from '../../../../modules/shared';

/* tslint:disable:max-classes-per-file */
// tslint:disable-next-line: no-namespace
export namespace AppActions {
  export enum Actions {
    SetAppDisplayed = '[App] SetAppDisplayed',
    SetTourInProgress = '[App] SetTourInProgress',
    StartTour = '[App] StartTour',
  }

  export class SetAppDisplayedAction implements ActionWithData<boolean> {
    readonly type: Actions = Actions.SetAppDisplayed;
    constructor(public data: boolean) {}
  }

  export class SetTourInProgressAction implements ActionWithData<boolean> {
    readonly type: Actions = Actions.SetTourInProgress;
    constructor(public data: boolean) {}
  }

  export class StartTourAction implements Action {
    readonly type: Actions = Actions.StartTour;
    constructor() {}
  }

  export type AppActionsType = SetAppDisplayedAction | SetTourInProgressAction | StartTourAction;
}
