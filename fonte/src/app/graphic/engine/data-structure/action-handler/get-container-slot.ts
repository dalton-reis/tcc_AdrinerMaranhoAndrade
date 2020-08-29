import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';

export class GetContainerSlotAction implements CytoscapeActionHandler {

  handle(cytoscape: any, action: ExecutionAction) {
    const { id, index } = action.params;
    console.log(`focus_slot_index`);
    console.log(action);
  }

  name() {
    return DataStructureAction.GET_CONTAINER_SLOT.name;
  }

}
