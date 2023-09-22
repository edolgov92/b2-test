import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, takeUntil, timer } from 'rxjs';
import { AbstractComponent } from '../../../modules/shared';

enum State {
  DisplayingSplashScreen = 'DisplayingSplashScreen',
  HidingSplashScreen = 'HidingSplashScreen',
  DisplayingApp = 'DisplayingApp',
}

const SPLASH_SCREEN_HIDE_TIMEOUT_MS: number = 4500;
const APP_SHOW_TIMEOUT_MS: number = 1000;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends AbstractComponent implements AfterViewInit {
  state$: BehaviorSubject<State> = new BehaviorSubject<State>(State.DisplayingSplashScreen);

  State = State;

  ngAfterViewInit(): void {
    timer(SPLASH_SCREEN_HIDE_TIMEOUT_MS)
      .pipe(takeUntil(this.destroyed$))
      .subscribe(() => {
        this.state$.next(State.HidingSplashScreen);
        timer(APP_SHOW_TIMEOUT_MS)
          .pipe(takeUntil(this.destroyed$))
          .subscribe(() => {
            this.state$.next(State.DisplayingApp);
          });
      });
  }
}
