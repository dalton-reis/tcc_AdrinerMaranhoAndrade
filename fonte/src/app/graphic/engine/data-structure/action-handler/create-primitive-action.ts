import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { SmalgPrimitive } from '../../../../script-engine/engine/smalg-javascript/types/smalg-primitive';

const MIN_WIDTH = 30;

export class CreatePrimitiveAction implements CytoscapeActionHandler {

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const { id, type, value } = action.params;
    const labelValue = value + '';
    const nodeWidth = labelValue.length * 10;
    cytoscape.add({
      data: {
        id,
        labelValue,
        type: SmalgPrimitive.TYPE_DESCRIPTOR,
        nodeWidth: nodeWidth < MIN_WIDTH ? MIN_WIDTH : nodeWidth,
      },
      classes: [ type ],
    });
  }

  name() {
    return DataStructureAction.CREATE_PRIMITIVE.name;
  }

}
