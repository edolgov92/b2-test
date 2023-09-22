import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LogoComponent],
    })
  );

  it('should create the LogoComponent', () => {
    const fixture: ComponentFixture<LogoComponent> = TestBed.createComponent(LogoComponent);
    const component: LogoComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
