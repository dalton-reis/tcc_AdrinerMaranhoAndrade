import { $id } from '../../core/cytoscape/cytoscape-utils';
import { CoreLayoutHandler } from './core-layout-handler';
import { LayoutExecutor } from './layout-executor';

export class ObjectLayoutHandler {

  private coreLayoutHandler = new CoreLayoutHandler();
  private layoutExecutor = new LayoutExecutor();

  async moveToAttrSlot(attrSlotElement: any, valueElement: any) {
    await this.coreLayoutHandler.moveToElement(attrSlotElement, valueElement);
  }

  async run(objectElement: any) {
    // Grid layout does not apply for compound nodes.
    const notCompoundChildren = objectElement.descendants(element => element.children().length === 0);

    await this.layoutExecutor.executeLayout(notCompoundChildren, {
      name: 'grid',
      fit: false,
      condense: true,
      cols: 2,
      boundingBox: objectElement.boundingBox(),
    });
  }

}
