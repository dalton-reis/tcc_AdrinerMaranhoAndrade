import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';

export class GetObjAttrAction implements CytoscapeActionHandler {

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const { id, name } = action.params;
    console.log(`focus_obj_attr`);
    console.log(action);
  }

  name() {
    return DataStructureAction.GET_OBJ_ATTR.name;
  }

}
