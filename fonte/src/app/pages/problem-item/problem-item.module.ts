import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProblemItemComponent } from './problem-item/problem-item.component';

@NgModule({
  declarations: [ProblemItemComponent],
  imports: [
    CommonModule,
  ],
  exports: [ ProblemItemComponent ],
})
export class ProblemItemModule { }
