import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicComponent } from './graphic/graphic.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GraphicComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    GraphicComponent,
  ],
})
export class GraphicModule { }
