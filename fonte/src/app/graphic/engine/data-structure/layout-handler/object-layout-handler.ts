import { CoreLayoutHandler } from './core-layout-handler';
import { LayoutExecutor } from './layout-executor';
import { objectBoundingBox } from './layout-utils';

export class ObjectLayoutHandler {

  private coreLayoutHandler = new CoreLayoutHandler();
  private layoutExecutor = new LayoutExecutor();

  async setInitialPosition(objectElement) {
    await this.coreLayoutHandler.moveToPosition({ x1: 100, y1: 0, x2: 150, y2: 50 }, objectElement, {
      animate: false,
    });
  }

  async moveToAttrSlot(attrSlotElement: any, valueElement: any) {
    await this.coreLayoutHandler.moveToPosition(attrSlotElement.boundingBox(), valueElement);
  }

  async onCreateAttr(objectElement: any, attrElement: any) {
    const notCompoundChildren = attrElement.descendants(element => element.children().length === 0);

    return await this.coreLayoutHandler.moveToPosition(
      objectBoundingBox(objectElement),
      notCompoundChildren,
      { animate: false },
    );
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
      position: function( node ) {
        node = node.data('type') === 'object-entry-element' ? node : node.parent();
        const index = node.data('index');
        return { row: Math.trunc(index / 2), col: index % 2};
      },
    });
  }

}
