import { MonacoEditorContext } from './monaco-editor-context';

export interface MonacoEditorConfig {

  language: string;
  context?: MonacoEditorContext[];

}
