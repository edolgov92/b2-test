import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeLayoutComponent } from './layout.component';

describe('HomeLayoutComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeLayoutComponent],
    })
  );

  it('should create the HomeLayoutComponent', () => {
    const fixture: ComponentFixture<HomeLayoutComponent> = TestBed.createComponent(HomeLayoutComponent);
    const component: HomeLayoutComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
