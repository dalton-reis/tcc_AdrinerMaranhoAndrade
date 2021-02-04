import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextEditorComponent } from './text-editor.component';
import { QuillModule } from 'ngx-quill';
import { FormsModule as ngFormsModule , ReactiveFormsModule as ngReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TextEditorComponent,
  ],
  imports: [
    CommonModule,
    QuillModule.forRoot(),
    ngFormsModule,
    ngReactiveFormsModule,
  ],
  exports: [
    TextEditorComponent,
  ],
})
export class TextEditorModule { }
