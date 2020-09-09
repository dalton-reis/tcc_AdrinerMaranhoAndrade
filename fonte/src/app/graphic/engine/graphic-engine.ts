import { ToolbarItem } from '../../models/toolbar-item';

export interface GraphicEngine {

  execute(action: ExecutionAction): Promise<void>;

  undo(): Promise<void>;

  clear(): Promise<void>;

  getToolbar(): ToolbarItem[];

}
