import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, firstValueFrom, takeUntil, timer } from 'rxjs';
import { AbstractComponent } from '../../../modules/shared';
import { AppActions, AppState } from '../../state-management';

enum State {
  DisplayingSplashScreen = 'DisplayingSplashScreen',
  HidingSplashScreen = 'HidingSplashScreen',
  DisplayingApp = 'DisplayingApp',
}

const APP_READY_TIMEOUT_MS: number = 1200;
const APP_SHOW_TIMEOUT_MS: number = 1000;
const SPLASH_SCREEN_HIDE_TIMEOUT_MS: number = 4500;

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

  private async startApp(): Promise<void> {
    await firstValueFrom(timer(SPLASH_SCREEN_HIDE_TIMEOUT_MS).pipe(takeUntil(this.destroyed$)));
    this.state$.next(State.HidingSplashScreen);
    await firstValueFrom(timer(APP_SHOW_TIMEOUT_MS).pipe(takeUntil(this.destroyed$)));
    this.state$.next(State.DisplayingApp);
    await firstValueFrom(timer(APP_READY_TIMEOUT_MS).pipe(takeUntil(this.destroyed$)));
    this.store.dispatch(new AppActions.SetAppDisplayedAction(true));
  }
}
