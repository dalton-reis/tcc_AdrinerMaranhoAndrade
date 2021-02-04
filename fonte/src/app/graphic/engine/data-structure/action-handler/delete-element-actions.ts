import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { DataStructureAction } from '../../../../models/data-structure-action';
import { $remove } from '../../core/cytoscape/cytoscape-utils';

export class DeleteElementAction implements CytoscapeActionHandler {

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    $remove(cytoscape, action.params.id);
  }

  name(): string {
    return DataStructureAction.DELETE_ELEMENT.name;
  }

}
