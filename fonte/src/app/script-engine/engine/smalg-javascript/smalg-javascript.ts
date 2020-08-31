import { ScriptEngine } from '../scritp-engine';
import { GraphicEngine } from '../../../graphic/engine/graphic-engine';
import { CompiledScript } from '../../compilers/compiled-script';
import { SmalgJavascriptContext } from './smalg-javascript-context';

export class SmalgJavascriptScriptEngine implements ScriptEngine {

  private currentStep = 0;
  private actions: ExecutionAction[] = [];
  private executing: boolean = false;
  private timeoutId: NodeJS.Timeout;

  constructor(
    private script: CompiledScript,
    private graphicEngine: GraphicEngine,
  ) {
    this.prepare();
  }

  private prepare() {
    this.script.execute(new SmalgJavascriptContext(this.actions));
  }

  execute(): void {
    if (!this.executing) {
      this.executing = true;
      this.startExecution();
    }
  }

  private async startExecution(): Promise<void> {
    await this.forward();
    this.scheduleExecution(1000);
  }

  private async scheduleExecution(time: number): Promise<void> {
    this.timeoutId = setTimeout(async () => {
      if (this.currentStep >= this.actions.length) {
        this.stop();
      } else {
        await this.forward();
        this.scheduleExecution(time);
      }
    }, time);
  }

  stop(): void {
    clearTimeout(this.timeoutId);
    this.executing = false;
  }

  async forward(): Promise<void> {
    if (this.currentStep < this.actions.length) {
      await this.graphicEngine.execute(this.actions[this.currentStep++]);
    }
  }

  async previous(): Promise<void> {
      this.currentStep--;
      this.graphicEngine.undo();
  }

  abort() {
    this.stop();
    this.graphicEngine.clear();
  }

}
