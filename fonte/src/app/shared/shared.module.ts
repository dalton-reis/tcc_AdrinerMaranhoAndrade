import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    ThemeModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
  ],
})
export class SharedModule { }
