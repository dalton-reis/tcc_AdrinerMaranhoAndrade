import { CompiledScript } from './compiled-script';

export interface ScriptCompiler {

  compile(code: string): CompiledScript;

}
