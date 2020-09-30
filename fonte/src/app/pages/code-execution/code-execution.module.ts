import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeExecutionRoutingModule } from './code-execution-routing.module';
import { CodeExecutionComponent } from './code-execution/code-execution.component';
import { GraphicModule } from '../../graphic/graphic.module';
import { CodeEditorModule } from '../../code-editor/code-editor.module';
import { ExecutionBarComponent } from './execution-bar/execution-bar.component';
import { SharedModule } from '../../shared/shared.module';
import { NbTooltipModule, NbSelectModule, NbDialogModule, NbCardModule, NbWindowModule } from '@nebular/theme';

@NgModule({
  declarations: [
    CodeExecutionComponent,
    ExecutionBarComponent,
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
  ],
  exports: [
    CodeExecutionComponent,
  ],
})
export class CodeExecutionModule { }
