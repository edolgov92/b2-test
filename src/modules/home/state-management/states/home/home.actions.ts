import { ActionWithData, DataDto } from '../../../../../common';

/* tslint:disable:max-classes-per-file */
// tslint:disable-next-line: no-namespace
export namespace HomeActions {
  export enum Actions {
    SetDataList = '[Home] SetDataList',
  }

  export class SetDataListAction implements ActionWithData<DataDto[]> {
    readonly type: Actions = Actions.SetDataList;
    constructor(public data: DataDto[]) {}
  }

  export type HomeActionsType = SetDataListAction;
}
