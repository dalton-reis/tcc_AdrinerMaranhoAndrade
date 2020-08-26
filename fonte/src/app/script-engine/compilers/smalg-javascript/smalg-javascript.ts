import { ScriptCompiler } from '../script-compiler';
import { CompiledScript } from '../compiled-script';
import { SmalgJavascriptFormatter } from './smalg-javascript-formatter';

class SmalgJavascriptCompiledScript implements CompiledScript {

  private executor: Function;

  constructor(code: string) {
    this.executor = new Function(SmalgJavascriptFormatter.format(code));
  }

  engine(): string {
    return 'smalg-javascript';
  }

  execute(context: any): void {
    this.executor.apply({ executionContext: context });
  }

}

export class SmalgJavascriptCompiler implements ScriptCompiler {

  compile(code: string): CompiledScript {
    return new SmalgJavascriptCompiledScript(code);
  }

}
