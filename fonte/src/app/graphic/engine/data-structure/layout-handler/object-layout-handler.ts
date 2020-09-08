import { $id } from '../../core/cytoscape/cytoscape-utils';
import { CoreLayoutHandler } from './core-layout-handler';
import { LayoutExecutor } from './layout-executor';
import { objectBoundingBox } from './layout-utils';

export class ObjectLayoutHandler {

  private coreLayoutHandler = new CoreLayoutHandler();
  private layoutExecutor = new LayoutExecutor();

  async moveToAttrSlot(attrSlotElement: any, valueElement: any) {
    await this.coreLayoutHandler.moveToElement(attrSlotElement, valueElement);
  }

  async onCreateAttr(objectElement: any, attrElement: any) {
    const notCompoundChildren = attrElement.descendants(element => element.children().length === 0);

    return await this.coreLayoutHandler.moveToElement(objectElement, notCompoundChildren);
  }

  async run(objectElement: any) {
    // Grid layout does not apply for compound nodes.
    const notCompoundChildren = objectElement.descendants(element => element.children().length === 0);

    return await this.runLayout(objectElement, notCompoundChildren);
  }

  private async runLayout(objectElement: any, elements: any) {
    await this.layoutExecutor.executeLayout(elements, {
      name: 'grid',
      fit: false,
      condense: true,
      cols: 2,
      boundingBox: objectBoundingBox(objectElement),
    });
  }

}
