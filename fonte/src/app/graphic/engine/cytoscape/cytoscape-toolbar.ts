import { ToolbarItem } from '../../../@core/data/toolbar-item';

export class CytoscapeToolbar {

  private constructor() {}

  static create(cy): ToolbarItem[] {
    return [{
      id: 'center',
      label: 'Centralizar',
      action: () => cy.fit(),
    }];
  }

}
