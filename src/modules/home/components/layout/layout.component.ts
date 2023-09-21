import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, takeUntil } from 'rxjs';
import { AbstractComponent, DataDto } from '../../../../common';
import { DataService } from '../../services';
import { HomeSelectors, HomeState } from '../../state-management';

@Component({
  selector: 'hm-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class HomeLayoutComponent extends AbstractComponent {
  dataList$: Observable<DataDto[]> = this.store
    .select(HomeSelectors.GetDataListSelector)
    .pipe(takeUntil(this.destroyed$));

  constructor(private dataService: DataService, private store: Store<HomeState>) {
    super();
  }

  ngAfterViewInit(): void {
    this.dataService.updateConfig(4000, 15);

    this.dataList$.subscribe((list) => {
      console.log(list);
    });
  }
}
