import { ClassContract } from '../../../models/problem/problem-contract';
import { uncapitalizeFirstLetter } from '../../engine/smalg-javascript/smalg-javascript-type-declaration';

export class SmalgJavascriptFormatter {

  private constructor() {}

  static format(contract: ClassContract, problemScenario: ProblemScenario, code: string): string {
    return `
    const clazzProvider = (context) => (${code});
    const scenarioFunction = Function(\`
    (function code(context, ${uncapitalizeFirstLetter(contract.name)}, assertion) {
      ${problemScenario.code}
    })(this.executionContext, this.clazz, this.assertion);\`)
    .bind({
      executionContext: this.executionContext,
      clazz: new (clazzProvider(this.executionContext))(),
      assertion: this.assertion,
    });
    scenarioFunction();
    `;
  }

}
