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
      // Initialize web worker
      this.worker = new Worker(new URL('../workers/data.worker', import.meta.url), {
        type: 'module',
      });
      this.worker.onmessage = ({ data }) => {
        if (!Array.isArray(data)) {
          return;
        }
        // Keep only last 10 items
        data = data.slice(DATA_LIST_SLICE_START);
        // Convert plain data to class instances
        const dataList: DataDto[] = plainToInstance(DataDto, data, { excludeExtraneousValues: true });
        for (const data of dataList) {
          // Validate each data to make sure we receive format that we expect
          const errors: ValidationError[] = validateSync(data);
          if (errors && errors.length > 0) {
            console.error(`Received data not valid: ${errors}`);
            return;
          }
        }
        // Updates data list in Store
        this.store.dispatch(new HomeActions.SetDataListAction(dataList));
      };
      this.worker.onerror = (err) => {
        console.error(err);
      };
    } else {
      console.error('Workers are not supported in this environment');
    }
  }

  /**
   * Sends new config to web worker
   */
  updateConfig(dataConfig: DataConfig): void {
    if (this.worker) {
      this.worker.postMessage(dataConfig);
    }
  }
}
