import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { ObjectLayoutHandler } from '../layout-handler/object-layout-handler';
import { ElementTypes } from '../data-structure-types';

export class CreateObjectAction implements CytoscapeActionHandler {

  private layoutHandler: ObjectLayoutHandler = new ObjectLayoutHandler();

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const { id } = action.params;
    const objectElement = cytoscape.add({
      data: {
        id,
        type: ElementTypes.OBJECT,
      },
    });
    await this.layoutHandler.run(objectElement);
  }

  name() {
    return DataStructureAction.CREATE_OBJECT.name;
  }

}
