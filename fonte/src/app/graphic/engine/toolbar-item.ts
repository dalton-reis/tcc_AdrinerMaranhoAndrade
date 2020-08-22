export interface ToolbarItem {

  id: string;
  label?: string;
  icon?: string;
  tooltip?: string;
  action: () => void;

};
