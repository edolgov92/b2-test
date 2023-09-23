import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ConfigPanelComponent } from './config-panel.component';

describe('ConfigPanelLayoutComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [ConfigPanelComponent],
      providers: [provideMockStore()],
    })
  );

  it('should create the ConfigPanelComponent', () => {
    const fixture: ComponentFixture<ConfigPanelComponent> = TestBed.createComponent(ConfigPanelComponent);
    const component: ConfigPanelComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
