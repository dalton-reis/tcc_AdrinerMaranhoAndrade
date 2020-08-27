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
`
const object_1 = context.newObject();
const container_1 = context.newContainer(6);
const int_1 = context.newPrimitive(1);
const double_1 = context.newPrimitive(1.0);
const string_1 = context.newPrimitive('teste');
const boolean_1 = context.newPrimitive(false);

object_1.setAttribute('attr1', int_1);
object_1.setAttribute('attr2', double_1);
container_1.set(0, boolean_1);
container_1.set(1, string_1);
`,
      language: config.language,
      automaticLayout: true,

    });
  }

  getToolbar() {
    return MonacoEditorToolbar.create(() => this.editor);
  }

}
