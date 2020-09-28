import { MonacoEditorContext } from './monaco-editor-context';

export interface MonacoEditorConfig {

  language: string;
  config?: any;
  contextSupplier?: (config?: any) => MonacoEditorContext[];

}
