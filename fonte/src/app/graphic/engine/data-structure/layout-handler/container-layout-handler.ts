import { $id } from '../../core/cytoscape/cytoscape-utils';
import { CoreLayoutHandler } from './core-layout-handler';
import { LayoutExecutor } from './layout-executor';

export class ContainerLayoutHandler {

  private coreLayoutExecutor = new CoreLayoutHandler();
  private layoutExecutor = new LayoutExecutor();

  async moveToSlot(slotElement: any, valueElement: any) {
    await this.coreLayoutExecutor.moveToElement(valueElement, slotElement);
  }

  async run(cytoscape: any, id: string) {
    const containerElement = $id(cytoscape, id);
    // Grid layout does not apply for compound nodes.
    const notCompoundChildren = containerElement.descendants(element => element.children().length === 0);
    await this.layoutExecutor.executeLayout(notCompoundChildren, {
      name: 'grid',
      fit: false,
      rows: 1,
      cols: notCompoundChildren.length,
    });
  }

}
