import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
  let fixture: ComponentFixture<LogoComponent>;
  let component: LogoComponent;
  let componentElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [LogoComponent],
    });
    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
  });

  it('should create the LogoComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render svg in LogoComponent', () => {
    expect(componentElement.querySelector('svg')).toBeTruthy();
  });
});
