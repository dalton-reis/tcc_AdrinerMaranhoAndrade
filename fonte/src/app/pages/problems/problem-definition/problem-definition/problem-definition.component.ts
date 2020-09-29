import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbStepperComponent } from '@nebular/theme';
import { ClassContract } from '../../../../models/problem/problem-contract';
import {
  ContractDefinitionComponent,
} from '../../contract-definition/contract-definition/contract-definition.component';
import { ProblemScenariosComponent } from '../../problem-scenarios/problem-scenarios/problem-scenarios.component';

@Component({
  selector: 'app-problem-definition',
  templateUrl: './problem-definition.component.html',
  styleUrls: ['./problem-definition.component.scss'],
})
export class ProblemDefinitionComponent implements OnInit {

  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;

  descriptionForm: FormGroup;
  classContract: ClassContract;
  problemScenarios: ProblemScenario[];

  constructor(private formBuilder: FormBuilder) {
    this.descriptionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.classContract = {
      name: '',
      fields: [],
      methods: [],
    };
    this.problemScenarios = [];
  }

  ngOnInit(): void {
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
      this.problemScenarios = scenarios;
      setTimeout(() => this.stepper.next());
    });
  }

  get name() {
    return this.descriptionForm.get('name');
  }

  get description() {
    return this.descriptionForm.get('description');
  }

}
