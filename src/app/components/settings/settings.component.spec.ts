import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SettingsComponent],
    })
  );

  it('should create the SettingsComponent', () => {
    const fixture: ComponentFixture<SettingsComponent> = TestBed.createComponent(SettingsComponent);
    const component: SettingsComponent = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
