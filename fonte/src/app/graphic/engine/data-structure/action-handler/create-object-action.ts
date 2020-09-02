import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { ObjectLayoutHandler } from '../layout-handler/object-layout-handler';

export class CreateObjectAction implements CytoscapeActionHandler {

  private layoutHandler: ObjectLayoutHandler = new ObjectLayoutHandler();

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const { id } = action.params;
    cytoscape.add({
      data: { id },
      style: {
        shape: 'round-rectangle',
        'border-width': '0px',
        'background-color': '#b0b0b0',
      },
    });

    await this.layoutHandler.run(cytoscape, id);
  }

  name() {
    return DataStructureAction.CREATE_OBJECT.name;
  }

}
