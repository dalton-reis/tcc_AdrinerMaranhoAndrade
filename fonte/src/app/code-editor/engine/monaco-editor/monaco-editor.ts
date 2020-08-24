import { MonacoEditorConfig } from './monaco-editor-config';
import { MonacoLoader } from './monaco-loader';

declare const monaco: any;

export class MonacoEditor {

  parent: HTMLDivElement;
  editor: any;

  constructor(parent: HTMLDivElement, config: MonacoEditorConfig) {
    MonacoLoader.loadIfNeeded(() => this.create(parent, config));
  }

  private create(parent: HTMLDivElement, config: MonacoEditorConfig) {
    parent.style.height = '100%';
    parent.style.width = '100%';
    this.editor = monaco.editor.create(parent, {
      value: 'function hello() {\n\talert("Hello world!");\n}',
      language: config.language,
      automaticLayout: true
    });
  }

}
