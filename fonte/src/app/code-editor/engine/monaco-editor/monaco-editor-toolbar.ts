import { ToolbarItem, ToolbarItemType } from '../../../models/toolbar-item';

export class MonacoEditorToolbar {

  private constructor() {}

  static create(editorProvider: () => any): ToolbarItem[] {
    return [{
      id: 'executar',
      type: ToolbarItemType.BUTTON,
      label: 'Executar',
      action: (actionEmitter) => {
        editorProvider().then(editor => {
          actionEmitter({ type: 'EXECUTE', params: { code: editor.getValue() } });
        });
      },
    }];
  }

}
