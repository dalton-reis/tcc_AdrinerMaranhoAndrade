import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-problem-definition',
  templateUrl: './problem-definition.component.html',
  styleUrls: ['./problem-definition.component.scss'],
})
export class ProblemDefinitionComponent implements OnInit {

  descriptionForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.descriptionForm = this.formBuilder.group({
      name: '',
      description: '',
    });
  }

  ngOnInit(): void {
  }

  saveProblemDefinition(value) {
    console.log(value);
  }

}
