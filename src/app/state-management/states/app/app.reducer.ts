import { AppStateInterface } from '../../interfaces';
import { AppActions } from './app.actions';

const initialState: AppStateInterface = {
  appDisplayed: false,
  tourInProgress: false,
};

export function appReducer(
  state: AppStateInterface = initialState,
  action: AppActions.AppActionsType
): AppStateInterface {
  switch (action.type) {
    case AppActions.Actions.SetAppDisplayed: {
      return { ...state, appDisplayed: (action as AppActions.SetAppDisplayedAction).data };
    }
    case AppActions.Actions.SetTourInProgress: {
      return { ...state, tourInProgress: (action as AppActions.SetTourInProgressAction).data };
    }
    default: {
      return state;
    }
  }
}
