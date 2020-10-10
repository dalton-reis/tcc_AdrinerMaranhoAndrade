export enum ErrorType {

  COMPILE_TIME = 'COMPILE_TIME',
  RUNTIME = 'RUNTIME',

}

export interface ErrorContext {

  type: ErrorType;
  message: string;

}
