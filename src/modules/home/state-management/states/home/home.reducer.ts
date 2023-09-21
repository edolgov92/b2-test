import { HomeStateInterface } from '../../interfaces';
import { HomeActions } from './home.actions';

const initialState: HomeStateInterface = {
  dataList: [],
};

export function homeReducer(
  state: HomeStateInterface = initialState,
  action: HomeActions.HomeActionsType
): HomeStateInterface {
  switch (action.type) {
    case HomeActions.Actions.SetDataList: {
      return { ...state, dataList: (action as HomeActions.SetDataListAction).data };
    }
    default: {
      return state;
    }
  }
}
