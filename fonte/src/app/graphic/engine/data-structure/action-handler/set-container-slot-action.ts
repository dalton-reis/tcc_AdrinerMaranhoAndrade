import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';

export class SetContainerSlotAction implements CytoscapeActionHandler {

  handle(cytoscape: any, action: ExecutionAction) {
    const { id, index, value } = action.params;
    console.log(action);
  }

  name() {
    return DataStructureAction.SET_CONTAINER_SLOT.name;
  }

}
