import { ToolbarItem } from "../toolbar-item";

export class CytoscapeToolbar {

  private CytoscapeToolbar() {}

  static create(cy): ToolbarItem[] {
    return [{
      id: 'center',
      label: 'Centralizar',
      action: () => cy.fit(),
    }];
  }

}
