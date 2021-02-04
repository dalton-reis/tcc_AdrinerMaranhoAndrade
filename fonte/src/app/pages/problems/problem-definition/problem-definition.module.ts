import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProblemDefinitionRoutingModule } from './problem-definition-routing.module';
import { ProblemDefinitionComponent } from './problem-definition/problem-definition.component';
import { NbStepperModule, NbCardModule, NbToastrModule, NbDialogModule } from '@nebular/theme';
import { SharedModule } from '../../../shared/shared.module';
import { FormsModule as ngFormsModule , ReactiveFormsModule as ngReactiveFormsModule } from '@angular/forms';
import { ContractDefinitionModule } from '../contract-definition/contract-definition.module';
import { ProblemScenariosModule } from '../problem-scenarios/problem-scenarios.module';
import { CodeExecutionModule } from '../../code-execution/code-execution.module';
import { LoginModule } from '../../../auth/login.module';
import { TextEditorModule } from '../../../text-editor/text-editor.module';
import { HelpModule } from '../../../documentation/help/help.module';

@NgModule({
  declarations: [ ProblemDefinitionComponent ],
  imports: [
    CommonModule,
    ProblemDefinitionRoutingModule,
    TextEditorModule,
    ngFormsModule,
    ngReactiveFormsModule,
    SharedModule,
    ContractDefinitionModule,
    ProblemScenariosModule,
    NbToastrModule,
    NbCardModule,
    NbStepperModule,
    CodeExecutionModule,
    LoginModule,
    NbDialogModule,
    HelpModule,
  ],
  exports: [ ProblemDefinitionComponent ],
})
export class ProblemDefinitionModule { }
