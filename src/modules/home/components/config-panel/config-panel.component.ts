import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, debounceTime, Observable, take, takeUntil } from 'rxjs';
import { AbstractComponent } from '../../../shared';
import { DataConfig } from '../../interfaces';
import { HomeActions, HomeSelectors, HomeState } from '../../state-management';
import { idsListValidator } from '../../validators';

interface FormValue {
  additionalIds: string[];
  arraySize: number;
  intervalMs: number;
}

const MAX_PARAMETERS_RELATION: number = 100;

@Component({
  selector: 'hm-config-panel',
  templateUrl: './config-panel.component.html',
  styleUrls: ['./config-panel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigPanelComponent extends AbstractComponent {
  additionalIds$: Observable<string[]> = this.store
    .select(HomeSelectors.GetAdditionalIdsSelector)
    .pipe(takeUntil(this.destroyed$));
  dataConfig$: Observable<DataConfig> = this.store
    .select(HomeSelectors.GetDataConfigSelector)
    .pipe(takeUntil(this.destroyed$));

  formUpdated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  formWasValidated$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  showBadConfigurationError$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  form: FormGroup;

  private initialFormValue: string = '';

  constructor(private formBuilder: FormBuilder, private store: Store<HomeState>) {
    super();

    this.form = formBuilder.group({
      additionalIds: [null, [idsListValidator()]],
      arraySize: [null, [Validators.required, Validators.min(1), Validators.max(100000)]],
      intervalMs: [null, [Validators.required, Validators.min(1), Validators.max(100000)]],
    });

    this.setStoredFormValues(false);

    this.form.valueChanges.subscribe((value: FormValue) => {
      const formUpdated: boolean = JSON.stringify(value) !== this.initialFormValue;
      if (this.formUpdated$.value !== formUpdated) {
        this.formUpdated$.next(formUpdated);
      }
      const showBadConfigurationError: boolean =
        formUpdated && value.intervalMs > 0 && value.arraySize / value.intervalMs > MAX_PARAMETERS_RELATION;
      if (showBadConfigurationError !== this.showBadConfigurationError$.value) {
        this.showBadConfigurationError$.next(showBadConfigurationError);
      }
      if (!formUpdated && this.formWasValidated$.value) {
        this.formWasValidated$.next(false);
      }
    });

    this.form.valueChanges.pipe(debounceTime(1000)).subscribe(() => {
      if (this.formUpdated$.value) {
        if (!this.formWasValidated$.value) {
          this.formWasValidated$.next(true);
        }
        const additionalIdsString: string = this.getFormAdditionalIdsList(false).join(', ');
        if (this.form.value.additionalIds !== additionalIdsString) {
          this.form.controls['additionalIds'].setValue(additionalIdsString, { emit: false });
        }
      }
    });
  }

  submit(): void {
    if (!this.form.valid) {
      return;
    }
    const additionalIds: string[] = this.getFormAdditionalIdsList(true);
    this.additionalIds$.pipe(take(1)).subscribe((storedAdditionalIds: string[]) => {
      if (JSON.stringify(storedAdditionalIds) !== JSON.stringify(additionalIds)) {
        this.store.dispatch(new HomeActions.SetAdditionalIdsAction(additionalIds));
      }
    });
    const dataConfig: DataConfig = {
      arraySize: this.form.value.arraySize,
      intervalMs: this.form.value.intervalMs,
    };
    this.dataConfig$.pipe(take(1)).subscribe((storedDataConfig: DataConfig) => {
      if (JSON.stringify(storedDataConfig) !== JSON.stringify(dataConfig)) {
        this.store.dispatch(new HomeActions.SetDataConfigAction(dataConfig));
      }
    });
    const additionalIdsString: string = additionalIds.join(', ');
    if (this.form.value.additionalIds !== additionalIdsString) {
      this.form.controls['additionalIds'].setValue(additionalIdsString, { emit: false });
    }
    this.setInitialFormValue();
    this.formUpdated$.next(false);
    this.formWasValidated$.next(false);
  }

  reset(): void {
    this.setStoredFormValues(true);
    this.formWasValidated$.next(false);
  }

  private setStoredFormValues(emitEvent: boolean): void {
    combineLatest([this.additionalIds$, this.dataConfig$])
      .pipe(take(1))
      .subscribe(([additionalIds, dataConfig]: [string[], DataConfig]) => {
        this.form.patchValue({ ...dataConfig, additionalIds: additionalIds.join(', ') }, { emitEvent });
        this.setInitialFormValue();
      });
  }

  private setInitialFormValue(): void {
    this.initialFormValue = JSON.stringify(this.form.value);
  }

  private getFormAdditionalIdsList(sort: boolean): string[] {
    const additionalIdsString: string = this.form.value.additionalIds || '';
    const additionalIds: string[] = additionalIdsString.replace(/\s+/g, '').split(',');
    if (sort) {
      additionalIds.sort((a: string, b: string) => parseInt(a) - parseInt(b));
    }
    return additionalIds;
  }
}
