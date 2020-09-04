import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { SmalgPrimitive } from '../../../../script-engine/engine/smalg-javascript/types/smalg-primitive';
import { PrimitiveLayoutHandler } from '../layout-handler/primitive-layout-handler';
import { $id } from '../../core/cytoscape/cytoscape-utils';

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
        type: SmalgPrimitive.TYPE_DESCRIPTOR,
        nodeWidth: nodeWidth < MIN_WIDTH ? MIN_WIDTH : nodeWidth,
      },
      classes: [ type ],
    });
    if (copiedFrom) {
      this.layoutHandler.moveToPrimitive($id(cytoscape, copiedFrom), newPrimitive);
    }
  }

  name() {
    return DataStructureAction.CREATE_PRIMITIVE.name;
  }

}
