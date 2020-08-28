import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';

const COLORS = {
  boolean: '#8046c2',
  number: '#35db61',
  string: '#eb9b1a',
};

const MIN_WIDTH = 30;

export class CreatePrimitiveAction implements CytoscapeActionHandler {

  handle(cytoscape: any, action: ExecutionAction) {
    const { id, type, value } = action.params;
    const labelValue = value + '';
    const nodeWidth = labelValue.length * 10;
    cytoscape.add({
      data: { id, labelValue },
      style: {
        width: nodeWidth < MIN_WIDTH ? MIN_WIDTH : nodeWidth,
        shape: 'round-rectangle',
        'background-color': COLORS[type],
      },
    });
  }

  name() {
    return DataStructureAction.CREATE_PRIMITIVE.name;
  }

}
