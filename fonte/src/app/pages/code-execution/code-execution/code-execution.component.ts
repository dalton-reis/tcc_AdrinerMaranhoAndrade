import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ScriptCompilerProvider } from '../../../script-engine/compilers/script-compiler-provider';
import { ScriptEngineProvider } from '../../../script-engine/engine/script-engine-provider';
import { GraphicEngine } from '../../../graphic/engine/graphic-engine';
import { ScriptEngine } from '../../../script-engine/engine/script-engine';
import { Action } from '../../../models/toolbar-action';
import { ErrorContext, ErrorType } from '../../../models/error-context';
import { ExecutionBarEvent } from '../../../models/execution-bar-event/execution-bar-event';
import { ExecutionBarState } from '../../../models/execution-bar-event/execution-bar-state';
import { ExecutionBarComponent } from '../execution-bar/execution-bar.component';

@Component({
  selector: 'app-code-execution',
  templateUrl: './code-execution.component.html',
  styleUrls: ['./code-execution.component.scss'],
})
export class CodeExecutionComponent implements OnInit {

  constructor() {}

  @Input() codeType: string = 'smalg-javascript-execution';
  @ViewChild('executionBar') executionBar: ExecutionBarComponent;

  private graphicEngine: GraphicEngine;
  private scriptEngine: ScriptEngine;

  hasError: boolean = false;
  errorContext: ErrorContext = null;
  isExecuting: boolean = false;

  ngOnInit(): void {
  }

  executeCodeEditorAction(action: Action) {
    if (action.type === 'EXECUTE') {

      if (!this.graphicEngine) {
        throw new Error('No graphic engine found');
      }

      if (this.scriptEngine) {
        this.executionBar.changeState(ExecutionBarState.STOP);
      }

      this.hasError = false;
      this.errorContext = null;

      const scriptCompiler = ScriptCompilerProvider.get(this.codeType);
      let compiledScript;
      try {
        compiledScript = scriptCompiler.compile(action.params.code);
      } catch (err) {
        this.hasError = true;
        this.errorContext = { type: ErrorType.COMPILE_TIME, message: err.message };
        return;
      }

      this.scriptEngine = ScriptEngineProvider.create(compiledScript, this.graphicEngine);
      this.scriptEngine.prepare()
        .then(() => {
          this.isExecuting = true;
          this.executionBar.changeState(ExecutionBarState.PLAY);
        })
        .catch(err => {
          this.hasError = true;
          this.errorContext = { type: ErrorType.RUNTIME, message: err.message };
        });
    }
  }

  onExecutionBarStateChanged(event: ExecutionBarEvent) {
    if (!this.scriptEngine) {
      return;
    }
    if (event.state === ExecutionBarState.STOP) {
      this.isExecuting = false;
      this.scriptEngine.abort();
    } else if (event.state === ExecutionBarState.STEP_BACWARD) {
      this.scriptEngine.previous().then(completed => this.onStepExecution(completed));
    } else if (event.state === ExecutionBarState.PLAY) {
      this.scriptEngine.resume()
        .then(completed => this.onResumeExecution(completed));
    } else if (event.state === ExecutionBarState.PAUSE) {
      this.scriptEngine.stop();
    } else if (event.state === ExecutionBarState.STEP_FORWARD) {
      this.scriptEngine.forward().then(completed => this.onStepExecution(completed));
    }
  }

  private onResumeExecution(completed: boolean) {
    if (completed) {
      this.executionBar.changeState(ExecutionBarState.PAUSE);
      this.executionBar.popUpMessage('Execução finalizada');
    }
  }

  private onStepExecution(hasNext: boolean) {
    this.executionBar.changeState(ExecutionBarState.PAUSE);
    if (!hasNext) {
      this.executionBar.popUpMessage('Execução finalizada');
    }
  }

  setGraphicEngine(graphicEngine: GraphicEngine) {
    this.graphicEngine = graphicEngine;
  }

}
