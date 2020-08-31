import { DataStructureEngine } from './data-structure-engine';
import { ToolbarItem } from '../../../models/toolbar-item';

export class DataScrutureEngineToolbar {

  private constructor() {}

  static create(engine: DataStructureEngine): ToolbarItem[] {
    return [{
      id: 'center',
      label: 'Centralizar',
      action: () => engine.center(),
    }, {
      id: 'organize',
      label: 'Organizar',
      action: () => engine.organize(),
    }];
  }

}
