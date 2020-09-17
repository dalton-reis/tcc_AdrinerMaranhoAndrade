import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeEditorComponent } from './code-editor/code-editor.component';
import { ToolbarModule } from '../toolbar/toolbar.module';
import { SharedModule } from '../shared/shared.module';
import { NbWindowModule } from '@nebular/theme';

@NgModule({
  declarations: [
    CodeEditorComponent,
  ],
  imports: [
    CommonModule,
    ToolbarModule,
    NbWindowModule,
    SharedModule,
  ],
  exports: [
    CodeEditorComponent,
  ],
})
export class CodeEditorModule { }
