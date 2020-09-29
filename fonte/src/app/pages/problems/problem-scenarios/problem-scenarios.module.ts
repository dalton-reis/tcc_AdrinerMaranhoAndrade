import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemScenariosComponent } from './problem-scenarios/problem-scenarios.component';
import { SharedModule } from '../../../shared/shared.module';
import { NbTabsetModule, NbToastrModule } from '@nebular/theme';
import { CodeEditorModule } from '../../../code-editor/code-editor.module';
import { FormsModule as ngFormsModule , ReactiveFormsModule as ngReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProblemScenariosComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NbTabsetModule,
    CodeEditorModule,
    ngFormsModule,
    ngReactiveFormsModule,
    NbToastrModule,
  ],
  exports: [
    ProblemScenariosComponent,
  ],
})
export class ProblemScenariosModule { }
