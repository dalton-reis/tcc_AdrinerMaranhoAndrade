import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbStepperComponent } from '@nebular/theme';
import { ClassContract } from '../../../../models/problem/problem-contract';
import {
  ContractDefinitionComponent,
} from '../../contract-definition/contract-definition/contract-definition.component';

@Component({
  selector: 'app-problem-definition',
  templateUrl: './problem-definition.component.html',
  styleUrls: ['./problem-definition.component.scss'],
})
export class ProblemDefinitionComponent implements OnInit {

  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;

  descriptionForm: FormGroup;
  classContract: ClassContract;
  classContractError: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.descriptionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.classContract = {
      fields: [],
      methods: [],
    };
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
      if (contract.methods.length === 0) {
        this.classContractError = true;
      } else {
        this.classContractError = false;
        this.classContract = contract;
        this.stepper.next();
      }
    });
  }

  get name() {
    return this.descriptionForm.get('name');
  }

  get description() {
    return this.descriptionForm.get('description');
  }

}
