import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CodeEditorProvider } from '../engine/code-editor-provider';
import { CodeEditor } from '../engine/code-editor';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit {

  @Input() type: string = CodeEditorProvider.default();
  @ViewChild('codeEditorContainer') codeEditorContainer: ElementRef;

  codeEditor: CodeEditor;

  constructor() { }

  ngAfterViewInit(): void {
    this.codeEditor = CodeEditorProvider.create(this.type, this.codeEditorContainer.nativeElement);
    // Avoid ExpressionChangedAfterItHasBeenCheckedError as the logic is relied on ngAfterViewInit
    setTimeout(() => this.init());
  }

  private init() {

  }

}
