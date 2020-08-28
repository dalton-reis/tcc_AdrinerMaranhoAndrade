import { Component, Input, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { CodeEditorProvider } from '../engine/code-editor-provider';
import { CodeEditor } from '../engine/code-editor';
import { Action } from '../../models/toolbar-action';
import { ToolbarItem } from '../../models/toolbar-item';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit {

  @Input() type: string = CodeEditorProvider.default();
  @Output() action = new EventEmitter<Action>();
  @ViewChild('codeEditorContainer') codeEditorContainer: ElementRef;

  codeEditor: CodeEditor;
  codeEditorToolbar: ToolbarItem[];

  constructor() { }

  ngAfterViewInit(): void {
    this.codeEditor = CodeEditorProvider.create(this.type, this.codeEditorContainer.nativeElement);
    // Avoid ExpressionChangedAfterItHasBeenCheckedError as the logic is relied on ngAfterViewInit
    setTimeout(() => this.init());
  }

  doToolbarAction(toolbarAction: Action) {
    this.action.emit(toolbarAction);
  }

  private init() {
    this.codeEditorToolbar = this.codeEditor.getToolbar();
  }

}
