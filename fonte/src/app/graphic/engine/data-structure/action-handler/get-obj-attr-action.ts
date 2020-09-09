import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { $id } from '../../core/cytoscape/cytoscape-utils';

export class GetObjAttrAction implements CytoscapeActionHandler {

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const { id, name } = action.params;
    const objectAttr = $id(cytoscape, `${id}_${name}`);
    if (objectAttr) {
      objectAttr.addClass('selected');
      await new Promise(resolve => setTimeout(() => resolve(), 1500));
      objectAttr.removeClass('selected');
    }
  }

  name() {
    return DataStructureAction.GET_OBJ_ATTR.name;
  }

}
