import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemDefinitionRoutingModule } from './problem-definition-routing.module';
import { ProblemDefinitionComponent } from './problem-definition/problem-definition.component';
import { NbStepperModule, NbCardModule } from '@nebular/theme';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule as ngFormsModule , ReactiveFormsModule as ngReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [ ProblemDefinitionComponent ],
  imports: [
    CommonModule,
    ProblemDefinitionRoutingModule,
    QuillModule.forRoot(),
    ngFormsModule,
    ngReactiveFormsModule,
    Ng2SmartTableModule,
    SharedModule,
    NbCardModule,
    NbStepperModule,
  ],
})
export class ProblemDefinitionModule { }
