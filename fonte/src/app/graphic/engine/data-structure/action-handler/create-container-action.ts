import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';

const parentStyle = {
  'shape': 'rectangle',
  'background-color': '#999999',
  'border-width': '0px',
};

const childStyle = {
  'shape': 'rectangle',
  'background-color': '#c2c2c2',
  'border-width': '2px',
  'border-style': 'solid',
  'border-color': '#999999',
};

export class CreateContainerAction implements CytoscapeActionHandler {

  handle(cytoscape: any, action: ExecutionAction) {
    const { id, size } = action.params;
    cytoscape.add({
      data: { id },
      style: parentStyle,
    });
    for (let i = 0; i < size; i++) {
      cytoscape.add({
        data: {
          id: `${id}_${i}`,
          parent: id,
        },
        style: childStyle,
        selectable: false,
        grabbable: false,
      });
    }
  }

  name() {
    return DataStructureAction.CREATE_CONTAINER.name;
  }

}
