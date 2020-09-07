import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { PrimitiveLayoutHandler } from '../layout-handler/primitive-layout-handler';
import { $id } from '../../core/cytoscape/cytoscape-utils';
import { ElementTypes } from '../data-structure-types';
import { PrimitivesContainer } from '../global/primitives-container';

const MIN_WIDTH = 30;

export class CreatePrimitiveAction implements CytoscapeActionHandler {

  private layoutHandler = new PrimitiveLayoutHandler();

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const { id, type, value, copiedFrom } = action.params;
    const labelValue = value + '';
    const nodeWidth = labelValue.length * 10;
    const newPrimitive = cytoscape.add({
      data: {
        id,
        labelValue,
        type: ElementTypes.PRIMITIVE,
        nodeWidth: nodeWidth < MIN_WIDTH ? MIN_WIDTH : nodeWidth,
        position: PrimitivesContainer.position,
      },
      classes: [ type ],
    });
    if (copiedFrom) {
      this.layoutHandler.moveToPrimitive($id(cytoscape, copiedFrom), newPrimitive);
    } else {
      const primitivesContainer = $id(cytoscape, PrimitivesContainer.id);
      newPrimitive.move({ parent: primitivesContainer.id() });
      this.layoutHandler.adjustPrimitives(primitivesContainer);
    }
  }

  name() {
    return DataStructureAction.CREATE_PRIMITIVE.name;
  }

}
