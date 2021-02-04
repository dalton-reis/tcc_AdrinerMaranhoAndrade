import { ScriptCompiler } from '../script-compiler';
import { CompiledScript } from '../compiled-script';
import { SmalgJavascriptFormatter } from './smalg-javascript-formatter';
import { SmalgJavascriptAssertion } from '../../engine/smalg-javascript/smalg-javascript-assertion';
import { ClassContract } from '../../../models/problem/problem-contract';

class SmalgJavascriptCompiledScript implements CompiledScript {

  private executor: Function;

  constructor(contract: ClassContract, problemScenario: ProblemScenario, code: string) {
    this.executor = new Function(SmalgJavascriptFormatter.format(contract, problemScenario, code));
  }

  engine(): string {
    return 'smalg-javascript';
  }

  execute(context: any): void {
    this.executor.apply({ executionContext: context, assertion: new SmalgJavascriptAssertion() });
  }

}

export class SmalgJavascriptCompiler implements ScriptCompiler {

  compile(contract: ClassContract, problemScenario: ProblemScenario, code: string): CompiledScript {
    return new SmalgJavascriptCompiledScript(contract, problemScenario, code);
  }

}
