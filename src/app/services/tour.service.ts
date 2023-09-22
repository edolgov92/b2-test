import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'ngx-webstorage';
import { filter, firstValueFrom, Observable, timer } from 'rxjs';
import { StorageItem } from '../../modules';
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
      steps: [
        {
          intro: this.translateService.instant('app.tour.step_1'),
          position: 'center',
        },
        {
          element: document.getElementById('tour-step-2'),
          intro: this.translateService.instant('app.tour.step_2'),
          position: 'top',
        },
        {
          element: document.getElementById('tour-step-3'),
          intro: this.translateService.instant('app.tour.step_3'),
          position: 'bottom',
        },
        {
          element: document.getElementById('tour-step-4'),
          intro: this.translateService.instant('app.tour.step_4'),
          position: 'bottom',
        },
        {
          element: document.getElementById('tour-step-5'),
          intro: this.translateService.instant('app.tour.step_5'),
          position: 'bottom',
        },
        {
          element: document.getElementById('tour-step-6'),
          intro: this.translateService.instant('app.tour.step_6'),
          position: 'bottom',
        },
        {
          element: document.getElementById('tour-step-7'),
          intro: this.translateService.instant('app.tour.step_7'),
          position: 'bottom',
        },
      ],
    });
  }
}
