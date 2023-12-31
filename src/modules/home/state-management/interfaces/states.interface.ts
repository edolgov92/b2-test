import { DataDto } from '../../../shared';
import { DataConfig } from '../../interfaces';

export interface HomeStateInterface {
  additionalIds: string[];
  dataConfig: DataConfig;
  dataList: DataDto[];
}

export interface HomeState {
  home: HomeStateInterface;
}
