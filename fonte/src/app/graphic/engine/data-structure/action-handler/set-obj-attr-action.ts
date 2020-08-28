import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';

export class SetObjAttrAction implements CytoscapeActionHandler {

  handle(cytoscape: any, action: ExecutionAction) {
    const { id, name, value } = action.params;
    console.log(action);
  }

  name() {
    return DataStructureAction.SET_OBJ_ATTR.name;
  }

}
