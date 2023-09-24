import { ActionWithData, DataDto } from '../../../../shared';
import { DataConfig } from '../../../interfaces';

export namespace HomeActions {
  export enum Actions {
    SetAdditionalIds = '[Home] SetAdditionalIds',
    SetDataConfig = '[Home] SetDataConfig',
    SetDataList = '[Home] SetDataList',
  }

  export class SetAdditionalIdsAction implements ActionWithData<string[]> {
    readonly type: Actions = Actions.SetAdditionalIds;
    constructor(public data: string[]) {}
  }

  export class SetDataConfigAction implements ActionWithData<DataConfig> {
    readonly type: Actions = Actions.SetDataConfig;
    constructor(public data: DataConfig) {}
  }

  export class SetDataListAction implements ActionWithData<DataDto[]> {
    readonly type: Actions = Actions.SetDataList;
    constructor(public data: DataDto[]) {}
  }

  export type HomeActionsType = SetAdditionalIdsAction | SetDataConfigAction | SetDataListAction;
}
