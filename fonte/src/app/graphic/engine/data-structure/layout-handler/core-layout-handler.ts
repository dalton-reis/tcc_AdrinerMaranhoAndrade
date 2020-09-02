import { LayoutExecutor } from './layout-executor';

export class CoreLayoutHandler {

  private layoutExecutor = new LayoutExecutor();

  async moveToElement(element: any, targetElement: any): Promise<void> {
    await this.layoutExecutor.executeLayout(element, {
      name: 'random',
      fit: false,
      boundingBox: targetElement.boundingBox(),
    });
  }

}
