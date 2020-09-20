import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbIconModule, NbInputModule } from '@nebular/theme';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    NbIconModule,
    NbButtonModule,
    NbInputModule,
  ],
})
export class SharedModule { }
