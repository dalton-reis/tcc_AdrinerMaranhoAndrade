import { LayoutExecutor, LayoutExecutorContext } from './layout-executor';

export class CoreLayoutHandler {

  private layoutExecutor = new LayoutExecutor();

  async moveToElement(targetElement: any, elements: any, context?: LayoutExecutorContext): Promise<void> {
    await this.layoutExecutor.executeLayout(elements, {
      name: 'random',
      fit: false,
      boundingBox: targetElement.boundingBox(),
    }, context);
  }

}
