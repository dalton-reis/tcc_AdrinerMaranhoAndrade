import { ToolbarItem } from '../../models/toolbar-item';

export interface CodeEditor {

  resize(): void;

  updateConfig(config: any);

  getToolbar(): ToolbarItem[];

  getValue(): string;

}
