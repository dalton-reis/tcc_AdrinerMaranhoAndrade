import { ToolbarItem } from '../../models/toolbar-item';

export interface GraphicEngine {

  execute(action: ExecutionAction);

  undo(): void;

  clear(): void;

  getToolbar(): ToolbarItem[];

}
