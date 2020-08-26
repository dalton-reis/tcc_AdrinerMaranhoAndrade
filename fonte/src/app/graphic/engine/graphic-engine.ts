import { ToolbarItem } from '../../@core/data/toolbar-item';

export interface GraphicEngine {

  execute(action: GraphicAction);

  undo(): void;

  clear(): void;

  getToolbar(): ToolbarItem[];

}
