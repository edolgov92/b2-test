import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SplashScreenComponent } from './splash-screen.component';

describe('SplashScreenComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SplashScreenComponent],
    })
  );

  it('should create the SplashScreenComponent', () => {
    const fixture: ComponentFixture<SplashScreenComponent> = TestBed.createComponent(SplashScreenComponent);
    const component: SplashScreenComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
