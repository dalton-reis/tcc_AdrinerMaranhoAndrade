import { CoreLayoutHandler } from './core-layout-handler';
import { LayoutExecutor } from './layout-executor';

export class PrimitiveLayoutHandler {

  private coreLayoutHandler = new CoreLayoutHandler();
  private layoutExecutor = new LayoutExecutor();

  async moveToPrimitive(targetPrimitive: any, sourcePrimitive: any) {
    return await this.coreLayoutHandler.moveToElement(targetPrimitive, sourcePrimitive, {
      animate: false,
    });
  }

}
