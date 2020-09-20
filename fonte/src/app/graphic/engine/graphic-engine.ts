import { ToolbarItem } from '../../models/toolbar-item';

export interface GraphicEngine {

  execute(action: ExecutionAction): Promise<void>;

  undo(): Promise<boolean>;

  clear(): Promise<void>;

  getToolbar(): ToolbarItem[];

}
