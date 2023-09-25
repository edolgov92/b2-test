import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, Observable, takeUntil, throttleTime } from 'rxjs';
import { AbstractComponent, DataDto } from '../../../shared';
import { HomeSelectors, HomeState } from '../../state-management';

export const THROTTLE_TIME: number = 100;

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
    .pipe(takeUntil(this.destroyed$), throttleTime(THROTTLE_TIME), distinctUntilChanged());

  additionalIds: string[] = [];

  constructor(private chRef: ChangeDetectorRef, private store: Store<HomeState>) {
    super();
  }

  ngOnInit(): void {
    // Store additional ids in local variable for faster access
    this.additionalIds$.subscribe((additionalIds: string[]) => {
      this.additionalIds = additionalIds;
      this.chRef.detectChanges();
    });
  }

  /**
   * Get unique id of each item in list
   */
  trackById(index: number, item: DataDto): string {
    return item.id;
  }
}
