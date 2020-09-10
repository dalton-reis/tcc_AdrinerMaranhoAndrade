import { CoreLayoutHandler } from './core-layout-handler';
import { LayoutExecutor, LayoutExecutorContext as LayoutExecutorOptions } from './layout-executor';
import { primitivesContainerBoundingBox } from './layout-utils';
import { PrimitivesContainer } from '../global/primitives-container';
import { $id } from '../../core/cytoscape/cytoscape-utils';

export class PrimitiveLayoutHandler {

  private coreLayoutHandler = new CoreLayoutHandler();
  private layoutExecutor = new LayoutExecutor();

  async moveToPrimitive(targetPrimitive: any, sourcePrimitive: any) {
    await this.coreLayoutHandler.moveToPosition(targetPrimitive.boundingBox(), sourcePrimitive, {
      animate: false,
    });
  }

  async moveToPrimitivesContainer(cytoscape, primitiveElement, options?: LayoutExecutorOptions) {
    const primitivesContainer = $id(cytoscape, PrimitivesContainer.id);
    await this.coreLayoutHandler.moveToPosition(primitivesContainer.boundingBox(), primitiveElement, options);
    primitiveElement.move({ parent: primitivesContainer.id() });
    await this.adjustPrimitives(primitivesContainer);
  }

  async adjustPrimitives(primitivesContainerElement, options?: LayoutExecutorOptions) {
    const primitivesElement = primitivesContainerElement.descendants(element => element.children().length === 0);
    await this.layoutExecutor.executeLayout(primitivesElement, {
      name: 'grid',
      fit: false,
      condense: true,
      boundingBox: primitivesContainerBoundingBox(primitivesContainerElement),
      cols: 1,
    }, options);
  }

}
