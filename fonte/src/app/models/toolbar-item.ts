import { Action } from './toolbar-action';

export interface ToolbarItem {

  id: string;
  label?: string;
  icon?: string;
  tooltip?: string;
  action: (eventEmitter: (ToolbarAction: Action) => void) => void;

}
