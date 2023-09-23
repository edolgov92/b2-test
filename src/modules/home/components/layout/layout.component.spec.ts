import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared';
import { DataConfig } from '../../interfaces';
import { DataService } from '../../services';
import { ConfigPanelComponent } from '../config-panel/config-panel.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { HomeLayoutComponent } from './layout.component';

const DATA_CONFIG: DataConfig = { arraySize: 1000, intervalMs: 300 };

describe('HomeLayoutComponent', () => {
  let fixture: ComponentFixture<HomeLayoutComponent>;
  let component: HomeLayoutComponent;
  let componentElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        TranslateModule.forRoot(),
      ],
      declarations: [HomeLayoutComponent, ConfigPanelComponent, DataTableComponent],
      providers: [DataService, provideMockStore({ initialState: { home: { dataConfig: DATA_CONFIG } } })],
    });
    fixture = TestBed.createComponent(HomeLayoutComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
  });

  it('should create the HomeLayoutComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should render sh-logo component', () => {
    fixture.detectChanges();
    expect(componentElement.querySelector('sh-logo')).not.toBeNull();
  });

  it('should render hm-config-panel component', () => {
    fixture.detectChanges();
    expect(componentElement.querySelector('hm-config-panel')).not.toBeNull();
  });

  it('should render hm-data-table component', () => {
    fixture.detectChanges();
    expect(componentElement.querySelector('hm-data-table')).not.toBeNull();
  });

  it('should call updateConfig of dataService with the correct value', () => {
    const dataService: DataService = TestBed.inject(DataService);
    const spy: jasmine.Spy = spyOn(dataService, 'updateConfig');
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalledWith(DATA_CONFIG);
  });

  it('should subscribe to dataConfig$ on view init', () => {
    const spy: jasmine.Spy = spyOn(component.dataConfig$, 'subscribe');
    component.ngAfterViewInit();
    expect(spy).toHaveBeenCalled();
  });
});
