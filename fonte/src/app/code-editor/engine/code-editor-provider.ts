import { CodeEditor } from './code-editor';
import { MonacoEditor } from './monaco-editor/monaco-editor';
import { SmalgJavascriptExecutionDeclaration } from '../../script-engine/engine/smalg-javascript-type-declaration';

export class CodeEditorProvider {

  private constructor() {}

  private static TYPES = {
    'smalg-javascript-execution': (parent: HTMLDivElement, config: any) => new MonacoEditor(parent, {
      language: 'javascript',
      context: [{ name: 'smalg-javascript-execution.d.ts', code: SmalgJavascriptExecutionDeclaration }],
    }),
    'smalg-javascript-assertion': (parent: HTMLDivElement, config: any) => new MonacoEditor(parent, {
      language: 'javascript',
      context: [{ name: 'smalg-javascript-assertion.d.ts', code: '' }],
    }),
  };

  static create(type: string, parent: HTMLDivElement, config: any = {}): CodeEditor {
    const editorType = this.TYPES[type];
    if (!editorType) throw Error('Code editor unrecognized.');
    return editorType(parent, config);
  }

  static default(): string {
    return 'smalg-javascript-execution';
  }

}
