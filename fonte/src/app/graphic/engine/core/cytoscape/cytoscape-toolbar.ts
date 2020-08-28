import { ToolbarItem } from '../../../../models/toolbar-item';

export class CytoscapeDefaultToolbar {

  private constructor() {}

  static create(cy: any): ToolbarItem[] {
    return [{
      id: 'center',
      label: 'Centralizar',
      action: () => cy.fit(),
    }, {
      id: 'organize',
      label: 'Organizar',
      action: () => cy.layout({ name: 'cose', animate: true,  componentSpacing: 10 }).run(),
    }];
  }

}
