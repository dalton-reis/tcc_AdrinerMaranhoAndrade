import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GraphicComponent } from './graphic/graphic.component';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  declarations: [
    GraphicComponent,
  ],
  imports: [
    CommonModule,
    ToolbarModule,
  ],
  exports: [
    GraphicComponent,
  ],
})
export class GraphicModule { }
