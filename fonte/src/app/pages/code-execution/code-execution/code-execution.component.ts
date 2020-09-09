import { Component, OnInit, Input } from '@angular/core';
import { ScriptCompilerProvider } from '../../../script-engine/compilers/script-compiler-provider';
import { ScriptEngineProvider } from '../../../script-engine/engine/script-engine-provider';
import { GraphicEngine } from '../../../graphic/engine/graphic-engine';
import { ScriptEngine } from '../../../script-engine/engine/scritp-engine';
import { Action } from '../../../models/toolbar-action';

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

  ngOnInit(): void {
  }

  executeCodeEditorAction(action: Action) {
    if (action.type === 'EXECUTE') {
      const scriptCompiler = ScriptCompilerProvider.get(this.codeType);
      const compiledScript = scriptCompiler.compile(action.params.code);
      if (!this.graphicEngine) {
        throw new Error('No graphic engine found');
      }
      if (this.scriptEngine) {
        this.scriptEngine.abort();
      }
      this.scriptEngine = ScriptEngineProvider.create(compiledScript, this.graphicEngine);
      this.scriptEngine.resume();
    }
  }

  setGraphicEngine(graphicEngine: GraphicEngine) {
    this.graphicEngine = graphicEngine;
  }

}
