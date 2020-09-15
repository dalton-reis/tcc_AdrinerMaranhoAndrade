import { ScriptEngine } from '../scritp-engine';
import { GraphicEngine } from '../../../graphic/engine/graphic-engine';
import { CompiledScript } from '../../compilers/compiled-script';
import { SmalgJavascriptContext } from './smalg-javascript-context';
import { v4 as uuidV4 } from 'uuid';

export class SmalgJavascriptScriptEngine implements ScriptEngine {

  private currentStep = 0;
  private actions: ExecutionAction[] = [];
  private resumeContext: string = null;
  private timeoutId: NodeJS.Timeout;
  private resumeSpeed = 1000;
  private whenPrepared: Promise<void>;

  constructor(
    private script: CompiledScript,
    private graphicEngine: GraphicEngine,
  ) {
    this.whenPrepared = new Promise((resolve, reject) => {
      try {
        this.script.execute(new SmalgJavascriptContext(this.actions));
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  }

  prepare(): Promise<void> {
    return this.whenPrepared;
  }

  resume(): void {
    if (!this.resumeContext) {
      this.resumeContext = uuidV4();
      this.executeResumeAction(this.resumeContext);
    }
  }

  private async executeResumeAction(resumeContext: string) {
    if (this.resumeContext !== resumeContext) return;

    const executed = await this.forward();
    if (executed) {
      this.timeoutId = setTimeout(() => this.executeResumeAction(resumeContext), this.resumeSpeed);
    }
  }

  stop(): void {
    clearTimeout(this.timeoutId);
    this.resumeContext = null;
  }

  async forward(): Promise<boolean> {
    if (this.currentStep < this.actions.length) {
      await this.graphicEngine.execute(this.actions[this.currentStep++]);
      return true;
    }
    return false;
  }

  async previous(): Promise<boolean> {
    if (this.currentStep < this.actions.length) {
      this.currentStep--;
      await this.graphicEngine.undo();
      return true;
    }
    return false;
  }

  abort() {
    this.stop();
    this.currentStep = 0;
    this.graphicEngine.clear();
  }

}
