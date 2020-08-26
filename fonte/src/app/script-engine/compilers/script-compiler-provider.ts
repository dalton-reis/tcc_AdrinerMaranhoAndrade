import { ScriptCompiler } from './script-compiler';
import { SmalgJavascriptCompiler } from './smalg-javascript/smalg-javascript';

interface ScriptTypes {
  [type: string]: ScriptCompiler;
}

export class ScriptCompilerProvider {

  private static TYPES: ScriptTypes = {
    'smalg-javascript': new SmalgJavascriptCompiler(),
  };

  private constructor() {}

  static get(type: string): ScriptCompiler {
    const compiler = this.TYPES[type];
    if (!compiler) {
      throw Error('Compiler not found');
    }
    return compiler;
  }

}
