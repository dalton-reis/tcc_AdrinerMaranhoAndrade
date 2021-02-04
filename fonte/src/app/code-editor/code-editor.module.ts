import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { SharedModule } from '../shared/shared.module';
import { NbWindowModule, NbTooltipModule } from '@nebular/theme';

@NgModule({
  declarations: [
    CodeEditorComponent,
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    NbWindowModule,
    SharedModule,
    NbTooltipModule,
  ],
  exports: [
    CodeEditorComponent,
  ],
})
export class CodeEditorModule { }
