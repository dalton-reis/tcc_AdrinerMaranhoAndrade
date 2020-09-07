import { LayoutExecutor, LayoutExecutorContext } from './layout-executor';
import { Anchor } from '../global/anchor';

export class CoreLayoutHandler {

  private layoutExecutor = new LayoutExecutor();

  async moveToElement(targetElement: any, elements: any, context?: LayoutExecutorContext): Promise<void> {
    await this.layoutExecutor.executeLayout(elements, {
      name: 'random',
      fit: false,
      boundingBox: targetElement.boundingBox(),
    }, context);
  }

  async organizeElements(cytoscape: any) {
    // const rootElements = cytoscape.elements('node[!parent][!fixed]');
    const anchor = cytoscape.elements(`#${Anchor.id}`);
    const rootElements = anchor.closedNeighborhood('nodes');
    console.log(rootElements);
    try {
      await this.layoutExecutor.executeLayout(rootElements, {
        name: 'cola',
        animate: true,
        fit: false,
      });
      console.warn('deu boa');
    } catch (err) {
      console.warn('deu erro', rootElements);
    }
  }

}
