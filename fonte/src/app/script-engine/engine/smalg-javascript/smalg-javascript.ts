import { ScriptEngine } from '../scritp-engine';
import { GraphicEngine } from '../../../graphic/engine/graphic-engine';
import { CompiledScript } from '../../compilers/compiled-script';
import { SmalgJavascriptContext } from './smalg-javascript-context';

export class SmalgJavascriptScriptEngine implements ScriptEngine {

  private currentStep = 0;
  private actions: GraphicAction[] = [];
  private intervalId: NodeJS.Timeout;

  constructor(
    private script: CompiledScript,
    private graphicEngine: GraphicEngine,
  ) {
    this.prepare();
  }

  private prepare() {
    this.script.execute(new SmalgJavascriptContext(this.actions));
  }

  execute() {
    if (!this.intervalId) {
      this.intervalId = setInterval(() => {
        this.forward();
        if (this.currentStep >= this.actions.length) {
          this.stop();
        }
      }, 1000);
    }
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  forward() {
    if (this.currentStep < this.actions.length) {
      this.graphicEngine.execute(this.actions[this.currentStep++]);
    }
  }

  previous() {
    if (!this.intervalId) {
      this.currentStep--;
      this.graphicEngine.undo();
    }
  }

  abort() {
    this.stop();
    this.graphicEngine.clear();
  }

}
