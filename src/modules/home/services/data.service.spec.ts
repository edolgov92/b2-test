import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ChildDto, DataDto } from '../../shared';
import { DataConfig } from '../interfaces';
import { HomeActions, HomeState } from '../state-management';
import { DataService } from './data.service';

const DATA_CONFIG: DataConfig = { arraySize: 1000, intervalMs: 300 };
const DATA_LIST: DataDto[] = [
  new DataDto('1', 5, 10.12, 'rgb(255, 228, 196)', new ChildDto('2', 'rgb(245, 123, 165)')),
];

describe('DataService', () => {
  let service: DataService;
  let worker: Worker;
  let store: MockStore;

  beforeEach(() => {
    worker = new Worker(new URL('../workers/data.worker', import.meta.url), {
      type: 'module',
    });
    spyOn(window, 'Worker').and.returnValue(worker);

    TestBed.configureTestingModule({
      providers: [DataService, provideMockStore()],
    });

    service = TestBed.inject(DataService);
    store = TestBed.inject(MockStore);
  });

  it('should create a worker when supported', () => {
    expect(worker).toBeDefined();
  });

  it('should log an error if worker instantiation fails', () => {
    const consoleErrorSpy: jasmine.Spy = spyOn(console, 'error');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Worker = undefined;
    service = new DataService(store as Store<HomeState>);
    expect(consoleErrorSpy).toHaveBeenCalledWith('Workers are not supported in this environment');
  });

  it('should log an error if the worker posts an error', () => {
    const consoleErrorSpy: jasmine.Spy = spyOn(console, 'error');
    const mockErrorEvent: ErrorEvent = new ErrorEvent('error', { error: new Error('Mock Error') });
    worker.onerror?.(mockErrorEvent);
    expect(consoleErrorSpy).toHaveBeenCalledWith(mockErrorEvent);
  });

  it('should dispatch SetDataListAction when the worker posts a message', () => {
    const storeDispatchSpy: jasmine.Spy = spyOn(store, 'dispatch');
    worker.onmessage?.({ data: JSON.parse(JSON.stringify(DATA_LIST)) } as MessageEvent);
    expect(storeDispatchSpy).toHaveBeenCalledWith(new HomeActions.SetDataListAction(DATA_LIST));
  });

  it('should log an error if the data received from the worker is not valid', () => {
    const consoleErrorSpy: jasmine.Spy = spyOn(console, 'error');
    const mockInvalidData = JSON.parse(JSON.stringify(DATA_LIST));
    delete mockInvalidData[0].id;
    worker.onmessage?.({ data: mockInvalidData } as MessageEvent);
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should post a message to the worker when updateConfig is called', () => {
    const workerPostMessageSpy: jasmine.Spy = spyOn(worker, 'postMessage');
    service.updateConfig(DATA_CONFIG);
    expect(workerPostMessageSpy).toHaveBeenCalledWith(DATA_CONFIG);
  });
});
