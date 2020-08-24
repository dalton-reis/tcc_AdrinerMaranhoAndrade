import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeExecutionRoutingModule } from './code-execution-routing.module';
import { CodeExecutionComponent } from './code-execution/code-execution.component';
import { GraphicModule } from '../../graphic/graphic.module';
import { CodeEditorModule } from '../../code-editor/code-editor.module';

@NgModule({
  declarations: [CodeExecutionComponent],
  imports: [
    CommonModule,
    CodeExecutionRoutingModule,
    GraphicModule,
    CodeEditorModule,
  ],
})
export class CodeExecutionModule { }
