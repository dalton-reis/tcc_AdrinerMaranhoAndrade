import { MonacoEditorConfig } from './monaco-editor-config';
import { MonacoLoader } from './monaco-loader';
import { CodeEditor } from '../code-editor';
import { MonacoEditorToolbar } from './monaco-editor-toolbar';

declare const monaco: any;

export class MonacoEditor implements CodeEditor {

  parent: HTMLDivElement;
  editor: any;

  constructor(parent: HTMLDivElement, config: MonacoEditorConfig) {
    MonacoLoader.loadIfNeeded(() => this.create(parent, config));
  }

  private create(parent: HTMLDivElement, config: MonacoEditorConfig) {
    parent.style.height = '100%';
    parent.style.width = '100%';
    this.editor = monaco.editor.create(parent, {
      value:
`context.novoObjeto();
context.novoContainer();
context.novoContainer();
context.novoObjeto();`,
      language: config.language,
      automaticLayout: true,

    });
  }

  getToolbar() {
    return MonacoEditorToolbar.create(() => this.editor);
  }

}
