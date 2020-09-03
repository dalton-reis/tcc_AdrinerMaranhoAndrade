import { LayoutExecutor } from './layout-executor';

export class CoreLayoutHandler {

  private layoutExecutor = new LayoutExecutor();

  async moveToElement(targetElement: any, elements: any, animate: boolean = true): Promise<void> {
    await this.layoutExecutor.executeLayout(elements, {
      name: 'random',
      fit: false,
      animate,
      boundingBox: targetElement.boundingBox(),
    });
  }

}
