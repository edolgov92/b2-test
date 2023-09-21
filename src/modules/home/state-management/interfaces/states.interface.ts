import { DataDto } from '../../../../common';

export interface HomeStateInterface {
  dataList: DataDto[];
}

export interface HomeState {
  home: HomeStateInterface;
}
