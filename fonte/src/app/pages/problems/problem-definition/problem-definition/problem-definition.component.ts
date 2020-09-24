import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm, FormArray } from '@angular/forms';
import { NbStepperComponent } from '@nebular/theme';

@Component({
  selector: 'app-problem-definition',
  templateUrl: './problem-definition.component.html',
  styleUrls: ['./problem-definition.component.scss'],
})
export class ProblemDefinitionComponent implements OnInit {

  @ViewChild(NbStepperComponent) stepper: NbStepperComponent;

  descriptionForm: FormGroup;
  contractForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.descriptionForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.contractForm = this.formBuilder.group({
      fields: this.formBuilder.array([]),
      methods: this.formBuilder.array([]),
    });
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

  get name() {
    return this.descriptionForm.get('name');
  }

  get description() {
    return this.descriptionForm.get('description');
  }

}
