import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../modules';
import { SplashScreenComponent } from './splash-screen.component';

describe('SplashScreenComponent', () => {
  let fixture: ComponentFixture<SplashScreenComponent>;
  let component: SplashScreenComponent;
  let componentElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, TranslateModule.forRoot()],
      declarations: [SplashScreenComponent],
    });
    fixture = TestBed.createComponent(SplashScreenComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
  });

  it('should create the SplashScreenComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should have a background div', () => {
    fixture.detectChanges();
    expect(componentElement.querySelector('.background')).toBeTruthy();
  });

  it('should have a container div', () => {
    fixture.detectChanges();
    expect(componentElement.querySelector('.container')).toBeTruthy();
  });

  it('should have correct translation key for title', () => {
    const fixture: ComponentFixture<SplashScreenComponent> = TestBed.createComponent(SplashScreenComponent);
    fixture.detectChanges();
    const titleElement: HTMLElement = componentElement.querySelector('.title')!;
    expect(titleElement.innerText).toEqual('app.splash_screen.title');
  });
});
