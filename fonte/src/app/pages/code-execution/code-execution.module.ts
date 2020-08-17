import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeExecutionRoutingModule } from './code-execution-routing.module';
import { CodeExecutionComponent } from './code-execution/code-execution.component';


@NgModule({
  declarations: [CodeExecutionComponent],
  imports: [
    CommonModule,
    CodeExecutionRoutingModule,
  ]
})
export class CodeExecutionModule { }
