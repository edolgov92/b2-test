import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, takeUntil, throttleTime } from 'rxjs';
import { AbstractComponent, DataDto } from '../../../../common';
import { HomeSelectors, HomeState } from '../../state-management';

@Component({
  selector: 'hm-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataTableComponent extends AbstractComponent implements OnInit {
  additionalIds$: Observable<string[]> = this.store
    .select(HomeSelectors.GetAdditionalIdsSelector)
    .pipe(takeUntil(this.destroyed$));
  dataList$: Observable<DataDto[]> = this.store
    .select(HomeSelectors.GetDataListSelector)
    .pipe(takeUntil(this.destroyed$), throttleTime(100));

  additionalIds: string[] = [];

  constructor(private chRef: ChangeDetectorRef, private store: Store<HomeState>) {
    super();
  }

  ngOnInit(): void {
    this.additionalIds$.subscribe((additionalIds: string[]) => {
      this.additionalIds = additionalIds;
      this.chRef.detectChanges();
    });
  }

  trackById(index: number, item: DataDto): string {
    return item.id;
  }
}
