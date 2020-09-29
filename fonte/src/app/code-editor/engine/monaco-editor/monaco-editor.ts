import { MonacoEditorConfig } from './monaco-editor-config';
import { MonacoLoader } from './monaco-loader';
import { CodeEditor } from '../code-editor';
import { MonacoEditorToolbar } from './monaco-editor-toolbar';
import { MonacoEditorContext } from './monaco-editor-context';

declare const monaco: any;

export class MonacoEditor implements CodeEditor {

  parent: HTMLDivElement;
  editor: any;
  contextSupplier: (config?: any) => MonacoEditorContext[];

  constructor(parent: HTMLDivElement, config: MonacoEditorConfig) {
    MonacoLoader.loadIfNeeded(
      () =>
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({ noLib: true, allowNonTsExtensions: true }),
      () => this.create(parent, config),
    );
  }

  private create(parent: HTMLDivElement, config: MonacoEditorConfig) {
    parent.style.height = '100%';
    parent.style.width = '100%';

    this.contextSupplier = config.contextSupplier;

    this.updateConfig(config.config);

    this.editor = monaco.editor.create(parent, {
      value:
`const object_1 = context.newObject();
const container_1 = context.newContainer(3);
const int_1 = context.newPrimitive(1);
const string_1 = context.newPrimitive('teste');

object_1.set('id', int_1);
object_1.set('id', null);

container_1.set(0, string_1);
container_1.set(0, null);

object_1.set('container', container_1);
container_1.set(1, object_1);

object_1.set('container', null);
container_1.set(1, null);`,
      language: config.language,
      automaticLayout: true,
    });
  }

  resize(): void {
    this.editor?.layout();
  }

  updateConfig(config) {
    monaco.languages.typescript.javascriptDefaults.setExtraLibs({});
    const context = (this.contextSupplier && this.contextSupplier(config)) || null;
    context?.forEach(declaration =>
    monaco.languages.typescript.javascriptDefaults.addExtraLib(declaration.code, declaration.name));
  }

  getValue(): string {
    return this.editor?.getValue();
  }

/**const object_1 = context.newObject();
const container_1 = context.newContainer(6);
const container_2 = context.newContainer(2);
const int_1 = context.newPrimitive(1);
const double_1 = context.newPrimitive(2.5);
const string_1 = context.newPrimitive('testando');
const string_2 = context.newPrimitive('teste 2');
const string_3 = context.newPrimitive('teste 3');
const boolean_1 = context.newPrimitive(false);
const boolean_2 = context.newPrimitive(true);

object_1.set('id', int_1);
object_1.set('valor', double_1);
object_1.set('descrição', string_2);
object_1.set('descrição', string_3);
object_1.set('container1', container_2);
object_1.set('container1', container_1);
object_1.set('container2', container_2);
object_1.get('id');
object_1.get('valor');
container_1.set(0, boolean_1);
container_1.set(0, boolean_2);
container_1.set(1, string_1);
container_1.set(2, string_3);
container_1.set(3, container_2);
container_1.set(3, object_1);
container_1.get(2);
container_1.get(3);
 */

/**
const object_1 = context.newObject();
const container_1 = context.newContainer(6);

object_1.set('id', container_1);
object_1.get('id');

container_1.set(0, object_1);
container_1.get(0);

const b = context.newPrimitive(true);
const s = context.newPrimitive('true');
const n = context.newPrimitive(2.5);

object_1.set('number', n);
object_1.set('string', s);
object_1.get('number');
object_1.get('string');

container_1.set(1, b);
container_1.set(2, s);
container_1.get(1);
container_1.get(2);
 */

 /**
  *
const object = context.newObject();

listaEncadeada.adicionar(object);
assertion.assertEquals(1, context.getContainers().length, 'Deveria haver somente um objeto no cenário');

const cabeca = listaEncadeada.cabeca();
assertion.assertEquals(cabeca, object, 'A cabeca da lista deveria ser o objeto adicionado');

listaEncadeada.remover(object);
assertion.assertEquals(0, listaEncadeada.tamanho(), 'O tamanho da lista deveria ser 0.');
  */

  getToolbar() {
    return MonacoEditorToolbar.create(() => this.editor);
  }

}
