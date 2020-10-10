import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbStepperComponent, NbToastrService } from '@nebular/theme';
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

@Component({
  selector: 'app-problem-definition',
  templateUrl: './problem-definition.component.html',
  styleUrls: ['./problem-definition.component.scss'],
})
export class ProblemDefinitionComponent implements OnInit {

  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;

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
  ) {
    this.descriptionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.classContract = {
      name: '',
      fields: [],
      methods: [],
    };
    this.scenarios = [];
    this.solution = '';
  }

  ngOnInit(): void {
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
      setTimeout(() => this.stepper.next());
    });
  }

  saveProblemScenarios(problemScenarios: ProblemScenariosComponent) {
    problemScenarios.getScenarios().then(scenarios => {
      this.scenarios = scenarios;
      setTimeout(() => this.stepper.next());
    });
  }

  saveProblemSolution(codeExecution: CodeExecutionComponent) {
    codeExecution.getCode().then(code => {
      this.solution = code;
      this.saveProblem();
    });
  }

  saveProblem() {
    const problem = {
      id: uuidV4(),
      name: this.name.value,
      description: this.description.value,
      classContract: this.classContract,
      scenarios: this.scenarios,
      solution: this.solution,
    };
    this.problemStorageService.save(problem)
      .then(() => {
        this.toastrService.success('Salvo com sucesso.');
        this.router.navigate(['pages', 'code-execution']);
      })
      .catch(() => this.toastrService.danger('Erro ao salvar.'));
  }

  get name() {
    return this.descriptionForm.get('name');
  }

  get description() {
    return this.descriptionForm.get('description');
  }

}
