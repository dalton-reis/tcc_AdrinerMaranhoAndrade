import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';

export class CreateObjectAction implements CytoscapeActionHandler {

  handle(cytoscape: any, action: ExecutionAction) {
    const { id } = action.params;
    cytoscape.add({
      data: { id },
      style: {
        shape: 'round-rectangle',
      },
    });
  }

  name() {
    return DataStructureAction.CREATE_OBJECT.name;
  }

}
