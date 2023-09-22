import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTableComponent } from './data-table.component';

describe('DataTableComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [DataTableComponent],
    })
  );

  it('should create the DataTableComponent', () => {
    const fixture: ComponentFixture<DataTableComponent> = TestBed.createComponent(DataTableComponent);
    const component: DataTableComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
