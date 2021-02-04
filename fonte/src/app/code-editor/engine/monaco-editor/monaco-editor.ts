import { MonacoEditorConfig } from './monaco-editor-config';
import { MonacoLoader } from './monaco-loader';
import { CodeEditor } from '../code-editor';
import { MonacoEditorToolbar } from './monaco-editor-toolbar';
import { MonacoEditorContext } from './monaco-editor-context';
import { v4 as uuidV4 } from 'uuid';

declare const monaco: any;

export class MonacoEditor implements CodeEditor {

  id = uuidV4();
  parent: HTMLDivElement;
  editorResolver;
  editorRejector;
  editorProvider: Promise<any> = new Promise((resolve, reject) => {
    this.editorResolver = resolve;
    this.editorRejector = reject;
  });
  contextSupplier: (config?: any) => MonacoEditorContext[];

  constructor(parent: HTMLDivElement, config: MonacoEditorConfig) {
    MonacoLoader.loadIfNeeded(
      () =>
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({ noLib: true, allowNonTsExtensions: true }),
      () => {
        try {
          this.create(parent, config);
        } catch (err) {
          console.error(err);
          this.editorRejector(err);
        }
      },
    );
  }

  private create(parent: HTMLDivElement, config: MonacoEditorConfig) {
    parent.style.height = '100%';
    parent.style.width = '100%';

    this.contextSupplier = config.contextSupplier;

    this.updateConfig(config.config);

    const editorCreated = monaco.editor.create(parent, {
      value: (config && config.code) || '',
      language: config.language,
      automaticLayout: true,
    });
    this.editorResolver(editorCreated);
  }

  resize(): void {
    this.editorProvider.then(editor => editor.layout());
  }

  updateConfig(config) {
    monaco.languages.typescript.javascriptDefaults.setExtraLibs({});
    const context = (this.contextSupplier && this.contextSupplier(config)) || null;
    context?.forEach(declaration =>
    monaco.languages.typescript.javascriptDefaults.addExtraLib(declaration.code, declaration.name));
  }

  getValue(): Promise<string> {
    return this.editorProvider?.then(editor => editor.getValue());
  }

  setValue(value: string) {
    this.editorProvider.then(editor => editor.setValue(value || ''));
  }

  getToolbar() {
    return MonacoEditorToolbar.create(() => this.editorProvider);
  }

}
