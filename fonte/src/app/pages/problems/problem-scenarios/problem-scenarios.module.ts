import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemScenariosComponent } from './problem-scenarios/problem-scenarios.component';
import { SharedModule } from '../../../shared/shared.module';
import { NbTabsetModule } from '@nebular/theme';

@NgModule({
  declarations: [
    ProblemScenariosComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NbTabsetModule,
  ],
  exports: [
    ProblemScenariosComponent,
  ],
})
export class ProblemScenariosModule { }
