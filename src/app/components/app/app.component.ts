import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, firstValueFrom, takeUntil, timer } from 'rxjs';
import { AbstractComponent } from '../../../modules/shared';
import { AppActions, AppState } from '../../state-management';

export enum State {
  DisplayingSplashScreen = 'DisplayingSplashScreen',
  HidingSplashScreen = 'HidingSplashScreen',
  DisplayingApp = 'DisplayingApp',
}

export const APP_READY_TIMEOUT_MS: number = 500;
export const APP_SHOW_TIMEOUT_MS: number = 500;
export const SPLASH_SCREEN_HIDE_TIMEOUT_MS: number = 4500;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends AbstractComponent implements AfterViewInit {
  state$: BehaviorSubject<State> = new BehaviorSubject<State>(State.DisplayingSplashScreen);

  State = State;

  constructor(private store: Store<AppState>) {
    super();
  }

  ngAfterViewInit(): void {
    this.startApp();
  }

  async startApp(): Promise<void> {
    try {
      await firstValueFrom(timer(SPLASH_SCREEN_HIDE_TIMEOUT_MS).pipe(takeUntil(this.destroyed$)));
      this.state$.next(State.HidingSplashScreen);
      await firstValueFrom(timer(APP_SHOW_TIMEOUT_MS).pipe(takeUntil(this.destroyed$)));
      this.state$.next(State.DisplayingApp);
      await firstValueFrom(timer(APP_READY_TIMEOUT_MS).pipe(takeUntil(this.destroyed$)));
      this.store.dispatch(new AppActions.SetAppDisplayedAction(true));
    } catch {}
  }
}
