import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  declarations: [
    CodeEditorComponent,
  ],
  imports: [
    CommonModule,
    ToolbarModule,
  ],
  exports: [
    CodeEditorComponent,
  ],
})
export class CodeEditorModule { }
