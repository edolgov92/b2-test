import { AbstractControl, ValidatorFn } from '@angular/forms';

export function idsListValidator(): ValidatorFn {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (control.value) {
      const ids: string[] = control.value.replace(/\s+/g, '').split(',');
      const invalidIds: string[] = ids.filter((item) => {
        const id: number = parseInt(item);
        return Number.isNaN(id) || id.toString() !== item;
      });
      if (invalidIds.length > 0) {
        return { invalidIds };
      }
    }
    return null;
  };
}
