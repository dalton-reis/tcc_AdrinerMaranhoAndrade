import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { ObjectLayoutHandler } from '../layout-handler/object-layout-handler';
import { ElementTypes } from '../data-structure-types';
import { $addRelation, $id } from '../../core/cytoscape/cytoscape-utils';
import { Anchor } from '../global/anchor';

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
    $addRelation(cytoscape, objectElement, $id(cytoscape, Anchor.id));
    await this.layoutHandler.run(objectElement);
    await this.layoutHandler.updateRootLayout(cytoscape);
  }

  name() {
    return DataStructureAction.CREATE_OBJECT.name;
  }

}
