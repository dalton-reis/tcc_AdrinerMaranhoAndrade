export class SmalgJavascriptFormatter {

  private constructor() {}

  static format(code: string): string {
    return `context = this.executionContext;\n${code}`;
  };

}
