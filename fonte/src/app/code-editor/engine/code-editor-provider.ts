import { CodeEditor } from './code-editor';
import { MonacoEditor } from './monaco-editor/monaco-editor';
import { ClassContract } from '../../models/problem/problem-contract';
import { v4 as uuidV4 } from 'uuid';
import {
  SmalgJavascriptExecutionDeclaration,
  AssertionDeclaration,
  ExecutionDeclaration,
} from '../../script-engine/engine/smalg-javascript/smalg-javascript-type-declaration';

export class CodeEditorProvider {

  private constructor() {}

  private static TYPES = {
    'smalg-javascript-execution': (parent: HTMLDivElement, classContract: ClassContract) => new MonacoEditor(parent, {
      language: 'javascript',
      code: ExecutionDeclaration.for(classContract),
      contextSupplier: () => [{ name: 'smalg-javascript-execution.d.ts', code: SmalgJavascriptExecutionDeclaration }],
    }),
    'smalg-javascript-assertion': (parent: HTMLDivElement, classContract: ClassContract) => new MonacoEditor(parent, {
      language: 'javascript',
      config: classContract,
      contextSupplier: (contract) =>
        [{ name: `smalg-javascript-assertion-${uuidV4()}.d.ts`, code: AssertionDeclaration.for(contract) }],
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
