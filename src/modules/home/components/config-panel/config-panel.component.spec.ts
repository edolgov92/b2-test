import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { DataConfig } from '../../interfaces';
import { HomeSelectors, HomeState } from '../../state-management';
import { ConfigPanelComponent } from './config-panel.component';

const ADDITIONAL_IDS: string[] = ['1', '2'];
const DATA_CONFIG: DataConfig = { arraySize: 1000, intervalMs: 300 };

describe('ConfigPanelLayoutComponent', () => {
  let fixture: ComponentFixture<ConfigPanelComponent>;
  let component: ConfigPanelComponent;
  let componentElement: HTMLElement;
  let store: MockStore<HomeState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, FormsModule, ReactiveFormsModule, TranslateModule.forRoot()],
      declarations: [ConfigPanelComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: HomeSelectors.GetAdditionalIdsSelector, value: ADDITIONAL_IDS },
            { selector: HomeSelectors.GetDataConfigSelector, value: DATA_CONFIG },
          ],
        }),
      ],
    });
    fixture = TestBed.createComponent(ConfigPanelComponent);
    component = fixture.componentInstance;
    componentElement = fixture.nativeElement;
    store = TestBed.inject(MockStore);
  });

  it('should create the ConfigPanelComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with stored values', () => {
    fixture.detectChanges();
    expect(component.form.value).toEqual({
      ...DATA_CONFIG,
      additionalIds: ADDITIONAL_IDS.join(', '),
    });
  });

  it('should mark form as invalid when required fields are empty', () => {
    component.form.controls['arraySize'].setValue(null);
    component.form.controls['intervalMs'].setValue(null);
    expect(component.form.invalid).toBeTruthy();
  });

  it('should dispatch actions on valid form submission', () => {
    spyOn(store, 'dispatch');
    component.form.controls['arraySize'].setValue(15);
    component.form.controls['intervalMs'].setValue(250);
    component.form.controls['additionalIds'].setValue('1, 2, 3');
    component.submit();
    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  it('should reset form to stored values when reset is called', () => {
    component.form.controls['arraySize'].setValue(50);
    component.form.controls['intervalMs'].setValue(500);
    component.form.controls['additionalIds'].setValue('1, 2, 3');
    component.reset();
    fixture.detectChanges();
    expect(component.form.value).toEqual({
      ...DATA_CONFIG,
      additionalIds: ADDITIONAL_IDS.join(', '),
    });
  });

  it('should disable apply button when form is invalid', () => {
    component.form.controls['arraySize'].setValue(null);
    component.form.controls['intervalMs'].setValue(null);
    fixture.detectChanges();
    const applyButton: HTMLButtonElement = componentElement.querySelector(
      '.btn-success'
    ) as HTMLButtonElement;
    expect(applyButton.disabled).toBeTrue();
    component.showBadConfigurationError$.next(true);
    fixture.detectChanges();
    expect(applyButton.disabled).toBeTrue();
  });

  it('should disable apply button when there is a bad configuration error', () => {
    component.form.controls['arraySize'].setValue(15);
    component.showBadConfigurationError$.next(true);
    fixture.detectChanges();
    const applyButton: HTMLButtonElement = componentElement.querySelector(
      '.btn-success'
    ) as HTMLButtonElement;
    expect(applyButton.disabled).toBeTrue();
  });

  it('should set .is-invalid class for invalid form control', () => {
    component.form.controls['intervalMs'].setValue(-1);
    fixture.detectChanges();
    const input: HTMLInputElement = componentElement.querySelector('#input-timer') as HTMLInputElement;
    expect(input.className).toContain('is-invalid');
  });

  it('should not dispatch actions on invalid form submission', () => {
    spyOn(store, 'dispatch');
    component.form.controls['arraySize'].setValue(-15);
    component.submit();
    expect(store.dispatch).not.toHaveBeenCalled();
  });

  it('should have timer ms input with proper placeholder and label', () => {
    fixture.detectChanges();
    const input: HTMLInputElement = componentElement.querySelector('#input-timer') as HTMLInputElement;
    const label: HTMLLabelElement = componentElement.querySelector(
      'label[for="input-timer"]'
    ) as HTMLLabelElement;
    expect(input).not.toBeNull();
    expect(label).not.toBeNull();
    expect(input.placeholder).toContain('interval_ms.placeholder');
    expect(label.textContent).toContain('interval_ms.label');
  });

  it('should have array size input with proper placeholder and label', () => {
    fixture.detectChanges();
    const input: HTMLInputElement = componentElement.querySelector('#input-array-size') as HTMLInputElement;
    const label: HTMLLabelElement = componentElement.querySelector(
      'label[for="input-array-size"]'
    ) as HTMLLabelElement;
    expect(input).not.toBeNull();
    expect(label).not.toBeNull();
    expect(input.placeholder).toContain('array_size.placeholder');
    expect(label.textContent).toContain('array_size.label');
  });

  it('should have additional ids input with proper placeholder and label', () => {
    fixture.detectChanges();
    const input: HTMLInputElement = componentElement.querySelector('#input-ids') as HTMLInputElement;
    const label: HTMLLabelElement = componentElement.querySelector(
      'label[for="input-ids"]'
    ) as HTMLLabelElement;
    expect(input).not.toBeNull();
    expect(label).not.toBeNull();
    expect(input.placeholder).toContain('additional_ids.placeholder');
    expect(label.textContent).toContain('additional_ids.label');
  });

  it('should show bad configuration error', () => {
    component.form.controls['arraySize'].setValue(2000);
    component.form.controls['intervalMs'].setValue(10);
    fixture.detectChanges();
    expect(component.showBadConfigurationError$.value).toBeTrue();
  });

  it('should update form value on input value change', () => {
    fixture.detectChanges();
    const arraySizeInput = componentElement.querySelector('#input-array-size') as HTMLInputElement;
    arraySizeInput.value = '150';
    arraySizeInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.form.controls['arraySize'].value).toBe(150);
  });

  it('should render an alert for bad configuration error', () => {
    component.showBadConfigurationError$.next(true);
    fixture.detectChanges();
    const alertElement: HTMLElement = componentElement.querySelector('.alert') as HTMLElement;
    expect(alertElement).not.toBeNull();
    expect(alertElement.textContent).toContain('bad_configuration');
  });

  it('should not render an alert if there is no bad configuration error', () => {
    component.showBadConfigurationError$.next(false);
    fixture.detectChanges();
    const alertElement: HTMLElement = componentElement.querySelector('.alert') as HTMLElement;
    expect(alertElement).toBeNull();
  });

  it('should call the submit method when the form is submitted', () => {
    spyOn(component, 'submit');
    component.form.controls['arraySize'].setValue(50);
    fixture.detectChanges();
    const formElement: HTMLFormElement = componentElement.querySelector('form') as HTMLFormElement;
    formElement.dispatchEvent(new Event('submit'));
    expect(component.submit).toHaveBeenCalled();
  });

  it('should not show error messages on form controls when form is pristine', () => {
    fixture.detectChanges();
    const errorMessages: NodeListOf<Element> = componentElement.querySelectorAll('.error-message');
    const intervalMsInput: HTMLInputElement = componentElement.querySelector(
      '#input-timer'
    ) as HTMLInputElement;
    const arraySizeInput: HTMLInputElement = componentElement.querySelector('#input-ids') as HTMLInputElement;
    const additionalIdsInput: HTMLInputElement = componentElement.querySelector(
      '#input-ids'
    ) as HTMLInputElement;
    expect(errorMessages.length).toBe(0);
    expect(intervalMsInput.className).not.toContain('is-invalid');
    expect(arraySizeInput.className).not.toContain('is-invalid');
    expect(additionalIdsInput.className).not.toContain('is-invalid');
  });

  it('should call the reset method when the reset button is clicked', () => {
    spyOn(component, 'reset');
    component.form.controls['arraySize'].setValue(50);
    fixture.detectChanges();
    const resetButton: HTMLButtonElement = componentElement.querySelector(
      '.btn-secondary'
    ) as HTMLButtonElement;
    resetButton.click();
    expect(component.reset).toHaveBeenCalled();
  });

  // it('should show error when additional ids input has incorrect value', () => {
  //   component.form.controls['additionalIds'].setValue('abc, 123');
  //   fixture.detectChanges();
  //   const additionalIdsInput: HTMLInputElement = componentElement.querySelector(
  //     '#input-ids'
  //   ) as HTMLInputElement;
  //   expect(additionalIdsInput.className).toContain('is-invalid');
  // });

  // it('should render the apply button with the correct text', () => {
  //   fixture.detectChanges();
  //   const applyButton: HTMLButtonElement = componentElement.querySelector(
  //     '.btn-success'
  //   ) as HTMLButtonElement;
  //   expect(applyButton.textContent).toContain('apply.label');
  // });
});
