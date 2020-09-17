export enum ErrorType {

  COMPILE_TIME = 'COMPILE_TIME',
  RUNTIME = 'COMPILE_TIME',

}

export interface ErrorContext {

  type: ErrorType;
  message: string;

}
