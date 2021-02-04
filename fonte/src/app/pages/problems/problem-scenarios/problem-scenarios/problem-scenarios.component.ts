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
  @Input() preloadedScenarios: ProblemScenario[];

  scenarios: ProblemScenario[] = [];
  selected = false;

  ngOnInit(): void {
    this.scenarios = this.preloadedScenarios || this.scenarios;
  }

  addScenario() {
    this.scenarios.push({ id: uuidV4(), name: 'Cenário', description: '', code: '// seu código aqui' });
  }

  removeScenario() {
    this.scenarios = this.scenarios.slice(0, this.scenarios.length - 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.contract) {
      this.codeEditors?.forEach(codeEditor => codeEditor.updateConfig(changes.contract.currentValue));
    }
  }

  isSelected() {
    this.resizeCodeEditor();
  }

  resizeCodeEditor() {
    setTimeout(() => this.codeEditors?.forEach(codeEditor => codeEditor.resize()));
  }

  scenarioId(_, scenario) {
    return scenario.id;
  }

  async getScenarios(): Promise<ProblemScenario[]> {
    const scenariosAsync = this.scenarios.map(async ({ id, name, description }) => {
      const code = await this.codeEditors.find(codeEditor => codeEditor.uuid === id).getValue();
      return { id, name, description, code };
    });

    const scenarios = await Promise.all(scenariosAsync);

    if (!scenarios || scenarios.length === 0) {
      this.showValidationMessage(
        'Atenção',
        'Informe ao menos um cenário.',
      );
      return Promise.reject(new Error('Scenarios invalid.'));
    }

    if (scenarios.find(scenario => !scenario.name || !scenario.description || !scenario.code)) {
      this.showValidationMessage(
        'Atenção',
        'Alguns cenários estão inválidos. Verifique se todos possuem um nome, descrição e um código.',
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
      duration: 5000,
      hasIcon: false,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: true,
    };
    this.toastrService.show(message, title, config);
  }

}
