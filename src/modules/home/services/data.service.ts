import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HomeActions, HomeState } from '../state-management';

@Injectable()
export class DataService {
  private worker: Worker;

  constructor(private store: Store<HomeState>) {
    this.worker = new Worker('./data.worker', { type: 'module' });
    this.worker.onmessage = ({ data }) => {
      this.store.dispatch(new HomeActions.SetDataListAction(data));
    };
  }

  updateConfig(interval: number, size: number) {
    this.worker.postMessage({ interval, size });
  }
}
