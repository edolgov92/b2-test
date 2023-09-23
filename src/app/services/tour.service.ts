import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';
import { filter, firstValueFrom, Observable, timer } from 'rxjs';
import { StorageItem } from '../../modules';
import { TOUR_STEPS } from '../constants';
import { TourStep } from '../interfaces';
import { AppActions, AppSelectors, AppState } from '../state-management';

declare var introJs: any;

const START_TOUR_DELAY_MS: number = 1000;

@Injectable()
export class TourService {
  appDisplayed$: Observable<boolean> = this.store.select(AppSelectors.GetAppDisplayedSelector);
  tourInProgress$: Observable<boolean> = this.store.select(AppSelectors.GetTourInProgressSelector);

  private tour: any;

  constructor(
    private localStorageService: LocalStorageService,
    private store: Store<AppState>,
    private translateService: TranslateService
  ) {
    this.checkTour();
  }

  checkTour(): void {
    const tourCompleted: 'true' | undefined = this.localStorageService.retrieve(StorageItem.TourCompleted);
    if (!tourCompleted) {
      this.startTour();
    }
  }

  async startTour(): Promise<void> {
    await firstValueFrom(this.appDisplayed$.pipe(filter((appDisplayed: boolean) => !!appDisplayed)));
    const tourInProgress: boolean = await firstValueFrom(this.tourInProgress$);
    if (!tourInProgress) {
      await firstValueFrom(timer(START_TOUR_DELAY_MS));
      if (!this.tour) {
        this.tour = introJs();
        this.setTourSteps();
        this.tour.onexit(() => {
          this.store.dispatch(new AppActions.SetTourInProgressAction(false));
        });
      }
      this.tour.start();
      this.localStorageService.store(StorageItem.TourCompleted, 'true');
      this.store.dispatch(new AppActions.SetTourInProgressAction(true));
    }
  }

  private setTourSteps(): void {
    this.tour.setOptions({
      steps: TOUR_STEPS.map((item: TourStep) => {
        return {
          element: item.element ? document.getElementById(item.element) : undefined,
          intro: this.translateService.instant(item.intro),
          position: item.position,
        };
      }),
    });
  }
}
