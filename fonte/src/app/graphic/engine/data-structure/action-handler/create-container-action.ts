import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { ContainerLayoutHandler } from '../layout-handler/container-layout-handler';

const parentStyle = {
  'shape': 'rectangle',
  'background-color': '#999999',
  'border-width': '0px',
};

const childStyle = {
  'shape': 'rectangle',
  'background-color': '#c2c2c2',
  'border-width': '0px',
};

export class CreateContainerAction implements CytoscapeActionHandler {

  private layoutHandler: ContainerLayoutHandler = new ContainerLayoutHandler();

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
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
          index: i,
        },
        style: childStyle,
        selectable: false,
        grabbable: false,
      });
    }
    await this.layoutHandler.run(cytoscape, id);
  }


  name(): string {
    return DataStructureAction.CREATE_CONTAINER.name;
  }

}
