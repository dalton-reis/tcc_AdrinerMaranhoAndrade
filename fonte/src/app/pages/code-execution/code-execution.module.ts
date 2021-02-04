import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeExecutionRoutingModule } from './code-execution-routing.module';
import { CodeExecutionComponent } from './code-execution/code-execution.component';
import { GraphicModule } from '../../graphic/graphic.module';
import { CodeEditorModule } from '../../code-editor/code-editor.module';
import { ExecutionBarComponent } from './execution-bar/execution-bar.component';
import { SharedModule } from '../../shared/shared.module';
import {
  NbTooltipModule,
  NbSelectModule,
  NbWindowModule,
  NbListModule,
  NbFormFieldModule,
  NbAccordionModule,
  NbCardModule,
  NbDialogModule,
} from '@nebular/theme';
import { ProblemsListComponent } from './problems-list/problems-list.component';
import { FormsModule as ngFormsModule , ReactiveFormsModule as ngReactiveFormsModule } from '@angular/forms';
import { ProblemExecutionComponent } from './problem-execution/problem-execution.component';
import { LoginModule } from '../../auth/login.module';
import { HelpModule } from '../../documentation/help/help.module';
import { SelectFileModule } from '../../commom/select-file/select-file.module';
import { ProblemItemModule } from '../problem-item/problem-item.module';

@NgModule({
  declarations: [
    CodeExecutionComponent,
    ExecutionBarComponent,
    ProblemsListComponent,
    ProblemExecutionComponent,
  ],
  imports: [
    CommonModule,
    CodeExecutionRoutingModule,
    SharedModule,
    GraphicModule,
    NbTooltipModule,
    CodeEditorModule,
    NbSelectModule,
    NbWindowModule,
    NbListModule,
    NbFormFieldModule,
    ngFormsModule,
    ngReactiveFormsModule,
    NbAccordionModule,
    NbCardModule,
    NbDialogModule,
    LoginModule,
    HelpModule,
    SelectFileModule,
    ProblemItemModule,
  ],
  exports: [
    CodeExecutionComponent,
  ],
})
export class CodeExecutionModule { }
