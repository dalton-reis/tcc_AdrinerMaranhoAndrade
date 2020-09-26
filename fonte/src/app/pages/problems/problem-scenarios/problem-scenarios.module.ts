import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemScenariosComponent } from './problem-scenarios/problem-scenarios.component';
import { SharedModule } from '../../../shared/shared.module';
import { NbTabsetModule } from '@nebular/theme';
import { CodeEditorModule } from '../../../code-editor/code-editor.module';

@NgModule({
  declarations: [
    ProblemScenariosComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NbTabsetModule,
    CodeEditorModule,
  ],
  exports: [
    ProblemScenariosComponent,
  ],
})
export class ProblemScenariosModule { }
