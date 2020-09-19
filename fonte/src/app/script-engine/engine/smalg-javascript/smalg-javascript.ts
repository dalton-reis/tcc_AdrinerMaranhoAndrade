import { ScriptEngine } from '../scritp-engine';
import { GraphicEngine } from '../../../graphic/engine/graphic-engine';
import { CompiledScript } from '../../compilers/compiled-script';
import { SmalgJavascriptContext } from './smalg-javascript-context';
import { v4 as uuidV4 } from 'uuid';

interface ResumeContext {
  id: string;
  timeoutId?: NodeJS.Timeout;
  complete: (completed) => void;
  completeExceptionally: (err: Error) => void;
}

export class SmalgJavascriptScriptEngine implements ScriptEngine {

  private currentStep = 0;
  private actions: ExecutionAction[] = [];
  private resumeContext: ResumeContext = null;
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

  resume(): Promise<boolean> {
    if (!this.resumeContext) {
      return new Promise((resolve, reject) => {
        this.resumeContext = {
          id: uuidV4(),
          complete: (completed) => resolve(completed),
          completeExceptionally: (err) => reject(err),
        };
        this.executeResumeAction(this.resumeContext);
      });
    }
  }

  private async executeResumeAction(resumeContext: ResumeContext) {
    if (!this.resumeContext || (this.resumeContext.id !== resumeContext.id)) {
      resumeContext.complete(false);
      return;
    }
    try {
      const executed = await this.forward();
      if (executed) {
        resumeContext.timeoutId = setTimeout(() => this.executeResumeAction(resumeContext), this.resumeSpeed);
      } else {
        resumeContext.complete(true);
      }
    } catch (err) {
      resumeContext.completeExceptionally(err);
    }
  }

  stop(): void {
    if (this.resumeContext) {
      clearTimeout(this.resumeContext.timeoutId);
      this.resumeContext = null;
    }
  }

  async forward(): Promise<boolean> {
    if (this.currentStep < this.actions.length) {
      await this.graphicEngine.execute(this.actions[this.currentStep++]);
      return true;
    }
    return false;
  }

  async previous(): Promise<boolean> {
    if (this.currentStep > 0) {
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
