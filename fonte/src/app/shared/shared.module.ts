import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbIconModule } from '@nebular/theme';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    NbIconModule,
    NbButtonModule,
  ],
})
export class SharedModule { }
