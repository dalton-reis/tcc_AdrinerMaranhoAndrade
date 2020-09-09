import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { $id } from '../../core/cytoscape/cytoscape-utils';

export class GetContainerSlotAction implements CytoscapeActionHandler {

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const { id, index } = action.params;
    const containerSlot = $id(cytoscape, `${id}_${index}`);
    containerSlot.addClass('selected');
    await new Promise(resolve => setTimeout(() => resolve(), 1500));
    containerSlot.removeClass('selected');
  }

  name() {
    return DataStructureAction.GET_CONTAINER_SLOT.name;
  }

}
