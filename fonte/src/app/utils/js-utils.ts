export function isPrimitive(test: any): test is string | number | boolean {
  return test !== null && test!== undefined && (test !== Object(test));
}
