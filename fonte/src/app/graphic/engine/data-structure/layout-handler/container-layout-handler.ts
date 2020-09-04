import { CoreLayoutHandler } from './core-layout-handler';
import { LayoutExecutor } from './layout-executor';
import { containerBoundingBox } from './layout-utils';

export class ContainerLayoutHandler {

  private coreLayoutExecutor = new CoreLayoutHandler();
  private layoutExecutor = new LayoutExecutor();

  async moveToSlot(slotElement: any, valueElement: any) {
    const containerElement = slotElement.parent()[0];
    await this.coreLayoutExecutor.moveToElement(slotElement, valueElement);
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
