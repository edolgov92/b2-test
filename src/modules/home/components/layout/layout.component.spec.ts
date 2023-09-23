import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../../../shared';
import { DataService } from '../../services';
import { ConfigPanelComponent } from '../config-panel/config-panel.component';
import { DataTableComponent } from '../data-table/data-table.component';
import { HomeLayoutComponent } from './layout.component';

describe('HomeLayoutComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, TranslateModule.forRoot()],
      declarations: [HomeLayoutComponent, ConfigPanelComponent, DataTableComponent],
      providers: [DataService, provideMockStore()],
    })
  );

  it('should create the HomeLayoutComponent', () => {
    const fixture: ComponentFixture<HomeLayoutComponent> = TestBed.createComponent(HomeLayoutComponent);
    const component: HomeLayoutComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
