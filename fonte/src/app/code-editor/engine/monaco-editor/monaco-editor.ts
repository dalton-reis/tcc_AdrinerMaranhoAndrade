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
`const object_1 = context.newObject();
const container_1 = context.newContainer(6);
const container_2 = context.newContainer(2);
const int_1 = context.newPrimitive(1);
const double_1 = context.newPrimitive(2.5);
const string_1 = context.newPrimitive('testando');
const string_2 = context.newPrimitive('teste 2');
const string_3 = context.newPrimitive('teste 3');
const boolean_1 = context.newPrimitive(false);
const boolean_2 = context.newPrimitive(true);

object_1.setAttribute('id', int_1);
object_1.setAttribute('valor', double_1);
object_1.setAttribute('descrição', string_2);
object_1.setAttribute('descrição', string_3);
object_1.setAttribute('container1', container_2);
object_1.setAttribute('container1', container_1);
object_1.setAttribute('container2', container_2);
container_1.set(0, boolean_1);
container_1.set(0, boolean_2);
container_1.set(1, string_1);
container_1.set(2, string_3);
container_1.set(3, container_2);
container_1.set(3, object_1);
`,
      language: config.language,
      automaticLayout: true,

    });
  }

  getToolbar() {
    return MonacoEditorToolbar.create(() => this.editor);
  }

}
