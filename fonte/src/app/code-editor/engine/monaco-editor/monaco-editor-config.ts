import { MonacoEditorContext } from './monaco-editor-context';

export interface MonacoEditorConfig {

  language: string;
  code?: string;
  config?: any;
  contextSupplier?: (config?: any) => MonacoEditorContext[];

}
