import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take, takeUntil } from 'rxjs';
import { AbstractComponent } from '../../../shared';
import { DataConfig } from '../../interfaces';
import { DataService } from '../../services';
import { HomeSelectors, HomeState } from '../../state-management';

@Component({
  selector: 'hm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeLayoutComponent extends AbstractComponent implements AfterViewInit {
  dataConfig$: Observable<DataConfig> = this.store
    .select(HomeSelectors.GetDataConfigSelector)
    .pipe(takeUntil(this.destroyed$));

  constructor(private dataService: DataService, private store: Store<HomeState>) {
    super();
  }

  ngAfterViewInit(): void {
    // Update data service config initially
    this.dataConfig$.pipe(take(1)).subscribe((dataConfig: DataConfig) => {
      this.dataService.updateConfig(dataConfig);
    });
  }
}
