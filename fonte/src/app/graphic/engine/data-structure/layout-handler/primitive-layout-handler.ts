import { CoreLayoutHandler } from './core-layout-handler';
import { LayoutExecutor } from './layout-executor';
import { primitivesContainerBoundingBox } from './layout-utils';

export class PrimitiveLayoutHandler {

  private coreLayoutHandler = new CoreLayoutHandler();
  private layoutExecutor = new LayoutExecutor();

  async moveToPrimitive(targetPrimitive: any, sourcePrimitive: any) {
    await this.coreLayoutHandler.moveToPosition(targetPrimitive.boundingBox(), sourcePrimitive, {
      animate: false,
    });
  }

  async adjustPrimitives(primitivesContainerElement) {
    const primitivesElement = primitivesContainerElement.descendants(element => element.children().length === 0);
    await this.layoutExecutor.executeLayout(primitivesElement, {
      name: 'grid',
      fit: false,
      condense: true,
      boundingBox: primitivesContainerBoundingBox(primitivesContainerElement),
      cols: 1,
    });
  }

}
