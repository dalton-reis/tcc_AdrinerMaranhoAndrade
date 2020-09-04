import { CoreLayoutHandler } from './core-layout-handler';

export class PrimitiveLayoutHandler {

  private coreLayoutHandler = new CoreLayoutHandler();

  async moveToPrimitive(targetPrimitive: any, sourcePrimitive: any) {
    return await this.coreLayoutHandler.moveToElement(targetPrimitive, sourcePrimitive, {
      animate: false,
    });
  }

}
