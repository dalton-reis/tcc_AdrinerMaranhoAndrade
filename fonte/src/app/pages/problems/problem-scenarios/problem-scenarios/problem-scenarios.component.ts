import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList, OnChanges, SimpleChanges } from '@angular/core';
import { ClassContract } from '../../../../models/problem/problem-contract';
import { CodeEditorComponent } from '../../../../code-editor/code-editor/code-editor.component';

@Component({
  selector: 'app-problem-scenarios',
  templateUrl: './problem-scenarios.component.html',
  styleUrls: ['./problem-scenarios.component.scss'],
})
export class ProblemScenariosComponent implements OnInit, OnChanges {

  private static scenarioId = 0;

  constructor() { }

  @ViewChildren('codeEditor') codeEditors: QueryList<CodeEditorComponent>;

  @Input() contract: ClassContract;

  scenarios = [];

  ngOnInit(): void {}

  addScenario() {
    this.scenarios.push({ id: ++ProblemScenariosComponent.scenarioId, name: 'Custom' });
  }

  removeScenario() {
    this.scenarios = this.scenarios.slice(0, this.scenarios.length - 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contract) {
      this.codeEditors?.forEach(codeEditor => codeEditor.updateConfig(changes.contract.currentValue));
    }
  }

  resizeCodeEditor() {
    setTimeout(() => this.codeEditors?.forEach(codeEditor => codeEditor.resize()));
  }

  scenarioId(_, scenario) {
    return scenario.id;
  }

}
