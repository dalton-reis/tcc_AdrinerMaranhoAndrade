import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicComponent } from './graphic/graphic.component';

@NgModule({
  declarations: [
    GraphicComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    GraphicComponent,
  ],
})
export class GraphicModule { }
