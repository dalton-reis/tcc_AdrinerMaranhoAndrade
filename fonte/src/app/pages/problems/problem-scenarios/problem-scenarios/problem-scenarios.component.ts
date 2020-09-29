import { Component, OnInit, Input, ViewChildren, QueryList, OnChanges, SimpleChanges } from '@angular/core';
import { ClassContract } from '../../../../models/problem/problem-contract';
import { CodeEditorComponent } from '../../../../code-editor/code-editor/code-editor.component';
import { v4 as uuidV4 } from 'uuid';
import { NbToastrService, NbComponentStatus, NbGlobalPhysicalPosition, NbTabsetComponent } from '@nebular/theme';

@Component({
  selector: 'app-problem-scenarios',
  templateUrl: './problem-scenarios.component.html',
  styleUrls: ['./problem-scenarios.component.scss'],
})
export class ProblemScenariosComponent implements OnInit, OnChanges {

  constructor(private toastrService: NbToastrService) { }

  @ViewChildren('codeEditor') codeEditors: QueryList<CodeEditorComponent>;

  @Input() contract: ClassContract;

  scenarios: ProblemScenario[] = [];

  ngOnInit(): void {}

  addScenario() {
    this.scenarios.push({ id: uuidV4(), name: 'Cenário', description: '', code: '' });
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

  getScenarios(): Promise<ProblemScenario[]> {
    const scenarios = this.scenarios.map(({ id, name, description }) => {
      const code = this.codeEditors.find(codeEditor => codeEditor.uuid === id).getValue();
      return { name, description, code };
    });

    if (scenarios.find(scenario => !scenario.name || !scenario.code)) {
      this.showValidationMessage(
        'Atenção',
        'Alguns cenários estão inválidos. Verifique se todos possuem um nome e um código.'
      );
      return Promise.reject(new Error('Scenarios invalid.'));
    }
    return Promise.resolve(scenarios);
  }

  private showValidationMessage(title: string, message: string) {
    const type: NbComponentStatus = 'warning';
    const config = {
      status: type,
      destroyByClick: true,
      duration: 3000,
      hasIcon: false,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    this.toastrService.show(message, title, config);
  }

}
