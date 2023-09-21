import { createSelector } from '@ngrx/store';
import { DataDto } from '../../../../../common';
import { HomeState, HomeStateInterface } from '../../interfaces';

export const GetHomeState: (state: HomeState) => HomeStateInterface = (state: HomeState) => state.home;

export const GetDataList: (state: HomeStateInterface) => DataDto[] = (state: HomeStateInterface) =>
  state.dataList;

const GetDataListSelector = createSelector(GetHomeState, GetDataList);

export const HomeSelectors = {
  GetDataListSelector,
};
