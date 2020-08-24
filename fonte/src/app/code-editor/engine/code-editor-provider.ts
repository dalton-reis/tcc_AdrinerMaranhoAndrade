import { CodeEditor } from './code-editor';
import { MonacoEditor } from './monaco-editor/monaco-editor';

export class CodeEditorProvider {

  private constructor() {}

  private static TYPES = {
    'javascript': (parent: HTMLDivElement) => new MonacoEditor(parent, { language: 'javascript' }),
  };

  static create(type: string, parent: HTMLDivElement): CodeEditor {
    const editorType = this.TYPES[type];
    if (!editorType) throw Error('Code editor unrecognized.');
    return editorType(parent);
  }

  static default(): string {
    return 'javascript';
  }

}
