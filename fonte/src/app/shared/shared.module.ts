import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbIconModule, NbInputModule, NbSpinnerModule, NbSelectModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ThemeModule,
    NbIconModule,
    NbSpinnerModule,
    NbButtonModule,
    NbSelectModule,
    NbInputModule,
  ],
})
export class SharedModule { }
