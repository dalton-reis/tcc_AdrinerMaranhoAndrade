import { ToolbarItem } from '../../models/toolbar-item';

export interface GraphicEngine {

  execute(action: ExecutionAction): Promise<void>;

  undo(): void;

  clear(): void;

  getToolbar(): ToolbarItem[];

}
