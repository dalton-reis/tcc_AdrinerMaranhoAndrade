import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbStepperComponent, NbToastrService, NbDialogService } from '@nebular/theme';
import { ClassContract } from '../../../../models/problem/problem-contract';
import {
  ContractDefinitionComponent,
} from '../../contract-definition/contract-definition/contract-definition.component';
import { ProblemScenariosComponent } from '../../problem-scenarios/problem-scenarios/problem-scenarios.component';
import { CodeExecutionComponent } from '../../../code-execution/code-execution/code-execution.component';
import { v4 as uuidV4 } from 'uuid';
import { ProblemStorageService } from '../../../../storage/problem-storage.service';
import { UserService } from '../../../../user/user.service';
import { Router } from '@angular/router';
import { Problem } from '../../../../models/problem/problem';

@Component({
  selector: 'app-problem-definition',
  templateUrl: './problem-definition.component.html',
  styleUrls: ['./problem-definition.component.scss'],
})
export class ProblemDefinitionComponent implements OnInit {

  @Input() problem: Problem;

  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;
  @ViewChild(ProblemScenariosComponent) scenariosComponent: ProblemScenariosComponent;
  @ViewChild('problemSolution') problemSolutionCodeComponent: CodeExecutionComponent;

  descriptionForm: FormGroup;
  classContract: ClassContract;
  scenarios: ProblemScenario[];
  solution: string;
  loading = true;
  loggedIn = false;

  constructor(
    private formBuilder: FormBuilder,
    private problemStorageService: ProblemStorageService,
    private toastrService: NbToastrService,
    private userService: UserService,
    private router: Router,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.descriptionForm = this.formBuilder.group({
      name: [this.problem?.name || '', Validators.required],
      description: [this.problem?.description || '', Validators.required],
    });
    this.classContract = this.problem?.classContract || ({
      name: '',
      fields: [],
      methods: [],
    });
    this.scenarios = this.problem?.scenarios || [];
    this.solution = this.problem?.solution || '';

    this.userService.getUser()
      .then(user => this.loggedIn = Boolean(user))
      .catch(() => this.loggedIn = false)
      .finally(() => this.loading = false);
  }

  saveForm(form: FormGroup) {
    if (this.descriptionForm.valid) {
      this.stepper.next();
    } else {
      Object.values(form.controls).forEach(control => control.markAsDirty());
    }
  }

  saveProblemContract(contractDefinition: ContractDefinitionComponent) {
    contractDefinition.getData().then(contract => {
      this.classContract = contract;
      setTimeout(() => {
        this.stepper.next();
        this.scenariosComponent.isSelected();
      });
    });
  }

  saveProblemScenarios(problemScenarios: ProblemScenariosComponent) {
    problemScenarios.getScenarios().then(scenarios => {
      this.scenarios = scenarios;
      setTimeout(() => this.stepper.next());
    });
  }

  proceedSave(type: string) {
    this.problemSolutionCodeComponent.getCode().then(code => {
      this.solution = code;
      this.saveProblem(type);
    });
  }

  confirmSaveProblem(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { autoFocus: false });
  }

  saveProblem(type: string) {
    const problem = {
      id: uuidV4(),
      name: this.name.value,
      description: this.description.value,
      classContract: this.classContract,
      scenarios: this.scenarios,
      solution: this.solution,
    } as Problem;

    if (type === 'persist') {
      this.problemStorageService.save(problem)
        .then(() => {
          this.toastrService.success('Salvo com sucesso.');
          this.router.navigate(['pages', 'code-execution']);
        })
        .catch(() => this.toastrService.danger('Erro ao salvar.'));
    } else if (type === 'export') {
      this.problemStorageService.export(problem);
    }
  }

  get name() {
    return this.descriptionForm.get('name');
  }

  get description() {
    return this.descriptionForm.get('description');
  }

}
