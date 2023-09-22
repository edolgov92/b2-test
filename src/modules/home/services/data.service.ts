import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';
import { DataDto } from '../../shared';
import { DataConfig } from '../interfaces';
import { HomeActions, HomeState } from '../state-management';

const DATA_LIST_LENGTH: number = 10;
const DATA_LIST_SLICE_START: number = DATA_LIST_LENGTH * -1;

@Injectable()
export class DataService {
  private worker: Worker | undefined;

  constructor(private store: Store<HomeState>) {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker(new URL('../workers/data.worker', import.meta.url), {
        type: 'module',
      });
      this.worker.onmessage = ({ data }) => {
        if (!Array.isArray(data)) {
          return;
        }
        data = data.slice(DATA_LIST_SLICE_START);
        const dataList: DataDto[] = plainToInstance(DataDto, data, { excludeExtraneousValues: true });
        for (const data of dataList) {
          const errors: ValidationError[] = validateSync(data);
          if (errors && errors.length > 0) {
            console.error(`Received data not valid: ${errors}`);
            return;
          }
        }
        this.store.dispatch(new HomeActions.SetDataListAction(dataList));
      };
      this.worker.onerror = (err) => {
        console.error(err);
      };
    } else {
      console.error('Workers are not supported in this environment');
    }
  }

  updateConfig(dataConfig: DataConfig): void {
    if (this.worker) {
      this.worker.postMessage(dataConfig);
    }
  }
}
