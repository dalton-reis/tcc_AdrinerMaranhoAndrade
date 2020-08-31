import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { ObjectLayoutHandler } from '../layout-handler/object-layout-handler';

export class CreateObjectAction implements CytoscapeActionHandler {

  private layoutHandler: ObjectLayoutHandler = new ObjectLayoutHandler();

  handle(cytoscape: any, action: ExecutionAction) {
    const { id } = action.params;
    cytoscape.add({
      data: { id },
      style: {
        shape: 'round-rectangle',
      },
    });

    this.layoutHandler.run(cytoscape, id);
  }

  name() {
    return DataStructureAction.CREATE_OBJECT.name;
  }

}
