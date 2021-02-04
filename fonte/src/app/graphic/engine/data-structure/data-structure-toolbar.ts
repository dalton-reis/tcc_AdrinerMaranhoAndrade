import { DataStructureEngine } from './data-structure-engine';
import { ToolbarItem, ToolbarItemType } from '../../../models/toolbar-item';
import { SpeedHandler } from './speed-handler';

export class DataScrutureEngineToolbar {

  private constructor() {}

  static create(engine: DataStructureEngine): ToolbarItem[] {
    return [{
      id: 'center',
      type: ToolbarItemType.BUTTON,
      label: 'Centralizar',
      action: () => engine.center(),
    }, {
      id: 'speed',
      label: 'Mudar velocidade',
      type: ToolbarItemType.SELECT,
      options: [{
        label: '1x',
        value: 1000,
        selected: true,
      }, {
        label: '1.5x',
        value: 750,
      }, {
        label: '2x',
        value: 500,
      }, {
        label: '3x',
        value: 333,
      }, {
        label: '5x',
        value: 200,
      }],
      action: (_, selectedSpeed) => SpeedHandler.speed = selectedSpeed,
    }];
  }

}
