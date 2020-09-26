import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  TemplateRef,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CodeEditorProvider } from '../engine/code-editor-provider';
import { CodeEditor } from '../engine/code-editor';
import { Action } from '../../models/toolbar-action';
import { ToolbarItem } from '../../models/toolbar-item';
import { ErrorContext } from '../../models/error-context';
import { NbWindowService, NbWindowRef, NbWindowState } from '@nebular/theme';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss']
})
export class CodeEditorComponent implements AfterViewInit, OnDestroy, OnChanges {

  private unsubscribe$ = new Subject<void>();

  @Input() type: string = CodeEditorProvider.default();
  @Input() hasError: boolean = false;
  @Input() errorContext: ErrorContext = null;
  @Input() config: any;
  @Output() action = new EventEmitter<Action>();

  @ViewChild('codeEditorContainer') codeEditorContainer: ElementRef;
  @ViewChild('errorWindow', { static: true }) errorWindow: TemplateRef<any>;

  codeEditor: CodeEditor;
  codeEditorToolbar: ToolbarItem[];
  errorsWindowRef: NbWindowRef = null;

  constructor(private windowService: NbWindowService) {}

  ngAfterViewInit(): void {
    this.codeEditor = CodeEditorProvider.create(this.type, this.codeEditorContainer.nativeElement, this.config);
    // Avoid ExpressionChangedAfterItHasBeenCheckedError as the logic is relied on ngAfterViewInit
    setTimeout(() => this.init());
  }

  doToolbarAction(toolbarAction: Action) {
    this.action.emit(toolbarAction);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasError.currentValue) {
      this.openErrorsWindow();
    } else {
      this.closeErrorsWindow();
    }
  }

  openErrorsWindow() {
    if (this.errorsWindowRef) {
      return;
    }
    this.errorsWindowRef = this.windowService.open(
      this.errorWindow,
      {
        title: 'Erros encontrados',
        hasBackdrop: false,
        closeOnEsc: false,
        initialState: NbWindowState.MAXIMIZED,
      },
    );
    this.errorsWindowRef.onClose
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.errorsWindowRef = null);
  }

  closeErrorsWindow() {
    if (this.errorsWindowRef) {
      this.errorsWindowRef.close();
    }
  }

  private init() {
    this.codeEditorToolbar = this.codeEditor.getToolbar();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
