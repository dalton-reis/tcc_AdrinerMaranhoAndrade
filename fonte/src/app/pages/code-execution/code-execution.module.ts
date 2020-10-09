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
} from '@nebular/theme';
import { ProblemsListComponent } from './problems-list/problems-list.component';
import { ProblemItemComponent } from './problems-list/problem-item/problem-item.component';
import { FormsModule as ngFormsModule , ReactiveFormsModule as ngReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CodeExecutionComponent,
    ExecutionBarComponent,
    ProblemsListComponent,
    ProblemItemComponent,
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
  ],
  exports: [
    CodeExecutionComponent,
  ],
})
export class CodeExecutionModule { }
