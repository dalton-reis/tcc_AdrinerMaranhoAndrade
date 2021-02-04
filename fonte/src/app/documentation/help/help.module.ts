import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    HelpComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    HelpComponent,
  ],
})
export class HelpModule { }
