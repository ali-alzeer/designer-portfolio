import { AbstractControl, FormControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function fileRequiredValidator(): ValidatorFn {
  return function(control: AbstractControl<any,any>): ValidationErrors | null {
    return control.value ? null : { required: true };
  };
}