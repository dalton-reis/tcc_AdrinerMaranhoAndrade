import { CompiledScript } from './compiled-script';
import { ClassContract } from '../../models/problem/problem-contract';

export interface ScriptCompiler {

  compile(contract: ClassContract, problemScenario: ProblemScenario, code: string): CompiledScript;

}
