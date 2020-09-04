import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { ContainerLayoutHandler } from '../layout-handler/container-layout-handler';
import { ElementTypes } from '../data-structure-types';

export class CreateContainerAction implements CytoscapeActionHandler {

  private layoutHandler: ContainerLayoutHandler = new ContainerLayoutHandler();

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const { id, size } = action.params;
    const containerElement = cytoscape.add({
      data: {
        id,
        type: ElementTypes.CONTAINER,
      },
    });
    for (let i = 0; i < size; i++) {
      cytoscape.add({
        data: {
          id: `${id}_${i}`,
          parent: id,
          index: i,
        },
        classes: ['slot'],
      });
    }
    await this.layoutHandler.run(containerElement);
  }


  name(): string {
    return DataStructureAction.CREATE_CONTAINER.name;
  }

}
