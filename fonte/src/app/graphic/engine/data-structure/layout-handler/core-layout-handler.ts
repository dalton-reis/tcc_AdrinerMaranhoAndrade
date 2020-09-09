import { LayoutExecutor, LayoutExecutorContext } from './layout-executor';
import { BoundingBox } from '../../core/cytoscape/types';

export class CoreLayoutHandler {

  private layoutExecutor = new LayoutExecutor();

  async moveToPosition(targetElement: BoundingBox, elements: any, context?: LayoutExecutorContext): Promise<void> {
    await this.layoutExecutor.executeLayout(elements, {
      name: 'random',
      fit: false,
      boundingBox: targetElement,
    }, context);
  }

}
