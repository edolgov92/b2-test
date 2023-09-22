import { createSelector } from '@ngrx/store';
import { AppState, AppStateInterface } from '../../interfaces';

export const GetAppState: (state: AppState) => AppStateInterface = (state: AppState) => state.app;

export const GetAppDisplayed: (state: AppStateInterface) => boolean = (state: AppStateInterface) =>
  state.appDisplayed;
export const GetTourInProgress: (state: AppStateInterface) => boolean = (state: AppStateInterface) =>
  state.tourInProgress;

const GetAppDisplayedSelector = createSelector(GetAppState, GetAppDisplayed);
const GetTourInProgressSelector = createSelector(GetAppState, GetTourInProgress);

export const AppSelectors = {
  GetAppDisplayedSelector,
  GetTourInProgressSelector,
};
