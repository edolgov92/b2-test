import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ConfigPanelComponent } from './config-panel.component';

describe('ConfigPanelLayoutComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ConfigPanelComponent],
    })
  );

  it('should create the ConfigPanelComponent', () => {
    const fixture: ComponentFixture<ConfigPanelComponent> = TestBed.createComponent(ConfigPanelComponent);
    const component: ConfigPanelComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
