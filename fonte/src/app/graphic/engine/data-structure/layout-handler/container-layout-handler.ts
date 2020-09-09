import { CoreLayoutHandler } from './core-layout-handler';
import { LayoutExecutor } from './layout-executor';
import { containerBoundingBox } from './layout-utils';

export class ContainerLayoutHandler {

  private coreLayoutHandler = new CoreLayoutHandler();
  private layoutExecutor = new LayoutExecutor();

  async setInitialPosition(containerElement) {
    await this.coreLayoutHandler.moveToPosition({ x1: 500, y1: 20, x2: 700, y2: 200 }, containerElement, {
      animate: false,
    });
  }

  async moveToContainer(containerElement: any, slotElement: any) {
    await this.coreLayoutHandler.moveToPosition(containerBoundingBox(containerElement), slotElement, {
      animate: false,
    });
  }

  async moveToSlot(slotElement: any, valueElement: any) {
    await this.coreLayoutHandler.moveToPosition(slotElement.boundingBox(), valueElement);
  }

  async run(containerElement: any) {
    // Grid layout does not apply for compound nodes.
    const notCompoundChildren = containerElement.descendants(element => element.children().length === 0);
    await this.layoutExecutor.executeLayout(notCompoundChildren, {
      name: 'grid',
      fit: false,
      condense: true,
      boundingBox: containerBoundingBox(containerElement),
      rows: notCompoundChildren.length,
      cols: 1,
      spacingFactor: 1.5,
    });
  }

}
