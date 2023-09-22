import { createSelector } from '@ngrx/store';
import { DataDto } from '../../../../../common';
import { DataConfig } from '../../../interfaces';
import { HomeState, HomeStateInterface } from '../../interfaces';

export const GetHomeState: (state: HomeState) => HomeStateInterface = (state: HomeState) => state.home;

export const GetAdditionalIds: (state: HomeStateInterface) => string[] = (state: HomeStateInterface) =>
  state.additionalIds;
export const GetDataConfig: (state: HomeStateInterface) => DataConfig = (state: HomeStateInterface) =>
  state.dataConfig;
export const GetDataList: (state: HomeStateInterface) => DataDto[] = (state: HomeStateInterface) =>
  state.dataList;

const GetAdditionalIdsSelector = createSelector(GetHomeState, GetAdditionalIds);
const GetDataConfigSelector = createSelector(GetHomeState, GetDataConfig);
const GetDataListSelector = createSelector(GetHomeState, GetDataList);

export const HomeSelectors = {
  GetAdditionalIdsSelector,
  GetDataConfigSelector,
  GetDataListSelector,
};
