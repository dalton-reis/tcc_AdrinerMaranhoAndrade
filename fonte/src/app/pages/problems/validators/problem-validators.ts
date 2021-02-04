import { ValidatorFn, AbstractControl } from '@angular/forms';

export function classValidator(propertyName: string): ValidatorFn {
  return regexValidator(/^[A-Z][A-z]*$/, propertyName);
}

export function validateMethodsAndFields(value: string): boolean {
  return /^[a-z_][A-z_0-9]*$/.test(value);
}

export function validateParameters(value: string) {
  return /^([a-z_][A-z_0-9]*)?(,\s*[a-z_][A-z_0-9]*)*$/.test(value);
}

export function regexValidator(expression: RegExp, propertyName: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    return !expression.test(control.value) ? { [propertyName]: {value: control.value} } : null;
  };
}
