import { Component, OnInit, Input } from '@angular/core';
import { ScriptCompilerProvider } from '../../../script-engine/compilers/script-compiler-provider';
import { ScriptEngineProvider } from '../../../script-engine/engine/script-engine-provider';
import { GraphicEngine } from '../../../graphic/engine/graphic-engine';
import { ScriptEngine } from '../../../script-engine/engine/scritp-engine';
import { Action } from '../../../models/toolbar-action';
import { ErrorContext, ErrorType } from '../../../models/error-context';

@Component({
  selector: 'app-code-execution',
  templateUrl: './code-execution.component.html',
  styleUrls: ['./code-execution.component.scss'],
})
export class CodeExecutionComponent implements OnInit {

  constructor() {}

  @Input() codeType: string = 'smalg-javascript';

  private graphicEngine: GraphicEngine;
  private scriptEngine: ScriptEngine;

  hasError: boolean = false;
  errorContext: ErrorContext = null;

  ngOnInit(): void {
  }

  executeCodeEditorAction(action: Action) {
    if (action.type === 'EXECUTE') {

      if (!this.graphicEngine) {
        throw new Error('No graphic engine found');
      }

      if (this.scriptEngine) {
        this.scriptEngine.abort();
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
        .then(() => this.scriptEngine.resume())
        .catch(err => {
          this.hasError = true;
          this.errorContext = { type: ErrorType.RUNTIME, message: err.message };
        });
    }
  }

  setGraphicEngine(graphicEngine: GraphicEngine) {
    this.graphicEngine = graphicEngine;
  }

}
