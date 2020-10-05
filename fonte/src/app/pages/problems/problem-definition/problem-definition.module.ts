import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemDefinitionRoutingModule } from './problem-definition-routing.module';
import { ProblemDefinitionComponent } from './problem-definition/problem-definition.component';
import { NbStepperModule, NbCardModule, NbToastrModule } from '@nebular/theme';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule as ngFormsModule , ReactiveFormsModule as ngReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ContractDefinitionModule } from '../contract-definition/contract-definition.module';
import { ProblemScenariosModule } from '../problem-scenarios/problem-scenarios.module';
import { CodeExecutionModule } from '../../code-execution/code-execution.module';

@NgModule({
  declarations: [ ProblemDefinitionComponent ],
  imports: [
    CommonModule,
    ProblemDefinitionRoutingModule,
    QuillModule.forRoot(),
    ngFormsModule,
    ngReactiveFormsModule,
    SharedModule,
    ContractDefinitionModule,
    ProblemScenariosModule,
    NbToastrModule,
    NbCardModule,
    NbStepperModule,
    CodeExecutionModule,
  ],
})
export class ProblemDefinitionModule { }
