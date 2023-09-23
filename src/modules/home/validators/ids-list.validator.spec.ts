import { FormControl, ValidatorFn } from '@angular/forms';
import { idsListValidator } from './ids-list.validator';

describe('IdsListValidator', () => {
  let control: FormControl;
  let validatorFn: ValidatorFn;

  beforeEach(() => {
    validatorFn = idsListValidator();
  });

  it('should return null if control value is falsy', () => {
    control = new FormControl('');
    expect(validatorFn(control)).toBeNull();

    control = new FormControl(null);
    expect(validatorFn(control)).toBeNull();
  });

  it('should return null if all ids are valid', () => {
    control = new FormControl('1,2,3');
    expect(validatorFn(control)).toBeNull();

    control = new FormControl('   10 , 20 , 30   ');
    expect(validatorFn(control)).toBeNull();
  });

  it('should return error object if any id is invalid', () => {
    control = new FormControl('1, 2.5, 3');
    expect(validatorFn(control)).toEqual({ invalidIds: ['2.5'] });

    control = new FormControl('abc, 123, xyz');
    expect(validatorFn(control)).toEqual({ invalidIds: ['abc', 'xyz'] });
  });

  it('should handle multiple spaces between ids and return appropriate results', () => {
    control = new FormControl('1 ,     2 ,   abc');
    expect(validatorFn(control)).toEqual({ invalidIds: ['abc'] });
  });

  it('should handle non-numeric, non-comma characters appropriately', () => {
    control = new FormControl('1a,2,3b');
    expect(validatorFn(control)).toEqual({ invalidIds: ['1a', '3b'] });
  });
});
