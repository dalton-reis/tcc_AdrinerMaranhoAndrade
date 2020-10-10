import { ClassContract } from '../../../models/problem/problem-contract';
import { uncapitalizeFirstLetter } from '../../engine/smalg-javascript/smalg-javascript-type-declaration';

export class SmalgJavascriptFormatter {

  private constructor() {}

  static format(contract: ClassContract, problemScenario: ProblemScenario, code: string): string {
    return `
    const clazzProvider = () => (${code});
    const scenarioFunction = Function(\`
    (function code(context, ${uncapitalizeFirstLetter(contract.name)}) {
      ${problemScenario.code}
    })(this.executionContext, this.clazz);\`)
    .bind({
      executionContext: this.executionContext,
      clazz: new (clazzProvider())(),
      assertion: this.assertion,
    });
    scenarioFunction();
    `;
  }

}
