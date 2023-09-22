import { HomeStateInterface } from '../../interfaces';
import { HomeActions } from './home.actions';

const initialState: HomeStateInterface = {
  additionalIds: [],
  dataConfig: { arraySize: 100, intervalMs: 1000 },
  dataList: [],
};

export function homeReducer(
  state: HomeStateInterface = initialState,
  action: HomeActions.HomeActionsType
): HomeStateInterface {
  switch (action.type) {
    case HomeActions.Actions.SetAdditionalIds: {
      return { ...state, additionalIds: (action as HomeActions.SetAdditionalIdsAction).data };
    }
    case HomeActions.Actions.SetDataConfig: {
      return { ...state, dataConfig: (action as HomeActions.SetDataConfigAction).data };
    }
    case HomeActions.Actions.SetDataList: {
      return { ...state, dataList: (action as HomeActions.SetDataListAction).data };
    }
    default: {
      return state;
    }
  }
}
