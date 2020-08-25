import { ToolbarItem } from '../../../@core/data/toolbar-item';

export class MonacoEditorToolbar {

  private constructor() {}

  static create(editorProvider: () => any): ToolbarItem[] {
    return [{
      id: 'executar',
      label: 'Executar',
      action: () => console.log(editorProvider()),
    }];
  }

}
