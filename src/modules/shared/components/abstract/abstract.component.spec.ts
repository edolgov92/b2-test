import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { AbstractComponent } from './abstract.component'; // adjust import to your file structure

@Component({
  template: '',
})
class TestComponent extends AbstractComponent {}

describe('AbstractComponent', () => {
  let component: TestComponent & { destroyed$: ReplaySubject<boolean> };
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance as TestComponent & { destroyed$: ReplaySubject<boolean> };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call next and complete on destroyed$ when component is destroyed', () => {
    spyOn(component.destroyed$, 'next');
    spyOn(component.destroyed$, 'complete');

    component.ngOnDestroy();

    expect(component.destroyed$.next).toHaveBeenCalledWith(true);
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });
});
