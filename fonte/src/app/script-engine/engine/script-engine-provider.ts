import { ScriptEngine } from './script-engine';
import { CompiledScript } from '../compilers/compiled-script';
import { GraphicEngine } from '../../graphic/engine/graphic-engine';
import { SmalgJavascriptScriptEngine } from './smalg-javascript/smalg-javascript';

interface ScriptTypes {
  [type: string]: (script: CompiledScript, graphicEngine: GraphicEngine) => ScriptEngine;
}

export class ScriptEngineProvider {

  private constructor() {}

  private static TYPES: ScriptTypes = {
    'smalg-javascript':
      (script: CompiledScript, graphicEngine: GraphicEngine) => new SmalgJavascriptScriptEngine(script, graphicEngine),
  };

  static create(script: CompiledScript, graphicEngine: GraphicEngine) {
    const engineType = script.engine();
    const scriptEngineProvider = this.TYPES[engineType];
    if (!scriptEngineProvider) {
      throw Error(`No script engine provider found for type: ${engineType}`);
    }
    return scriptEngineProvider(script, graphicEngine);
  }

}
