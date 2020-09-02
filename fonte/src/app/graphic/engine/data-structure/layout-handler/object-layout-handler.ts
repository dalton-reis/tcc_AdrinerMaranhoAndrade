import { $id } from '../../core/cytoscape/cytoscape-utils';
import { CoreLayoutHandler } from './core-layout-handler';
import { LayoutExecutor } from './layout-executor';

export class ObjectLayoutHandler {

  private coreLayoutHandler = new CoreLayoutHandler();
  private layoutExecutor = new LayoutExecutor();

  async moveToAttrSlot(attrSlotElement: any, valueElement: any) {
    await this.coreLayoutHandler.moveToElement(valueElement, attrSlotElement);
  }

  async run(cytoscape: any, id: string) {
    const objectElement = $id(cytoscape, id);
    const notCompoundChildren = objectElement.descendants(element => element.children().length === 0);

    await this.layoutExecutor.executeLayout(notCompoundChildren, {
      name: 'grid',
      fit: false,
      condense: true,
      cols: 2,
    });
  }

}
