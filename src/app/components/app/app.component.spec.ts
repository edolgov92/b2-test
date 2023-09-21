import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    })
  );

  it('should create the AppComponent', () => {
    const fixture: ComponentFixture<AppComponent> = TestBed.createComponent(AppComponent);
    const component: AppComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
