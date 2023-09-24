import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { DataConfig } from '../../../interfaces';
import { DataService } from '../../../services';
import { HomeActions } from './home.actions';
import { HomeEffects } from './home.effects';

const DATA_CONFIG: DataConfig = { arraySize: 100, intervalMs: 2000 };

describe('HomeEffects', () => {
  let actions$: Observable<Action>;
  let effects: HomeEffects;
  let dataService: jasmine.SpyObj<DataService>;

  beforeEach(() => {
    dataService = jasmine.createSpyObj('DataService', ['updateConfig']);

    TestBed.configureTestingModule({
      providers: [
        HomeEffects,
        provideMockActions(() => actions$),
        { provide: DataService, useValue: dataService },
      ],
    });

    effects = TestBed.inject(HomeEffects);
  });

  it('should call DataService.dataService when SetDataConfig action is dispatched', (done: DoneFn) => {
    actions$ = of(new HomeActions.SetDataConfigAction(DATA_CONFIG));

    effects.setDataConfig$.subscribe(() => {
      expect(dataService.updateConfig).toHaveBeenCalledWith(DATA_CONFIG);
      done();
    });
  });
});
