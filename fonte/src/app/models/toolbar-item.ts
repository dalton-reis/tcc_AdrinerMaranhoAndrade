import { Action } from './toolbar-action';

export enum ToolbarItemType {

  BUTTON = 'BUTTON',
  SELECT = 'SELECT',

}

export interface ToolbarItem {

  id: string;
  type: ToolbarItemType;
  label?: string;
  icon?: string;
  tooltip?: string;
  options?: { label: string, value: any, selected?: boolean }[];
  action: (eventEmitter: (ToolbarAction: Action) => void, params?: any) => void;

}
