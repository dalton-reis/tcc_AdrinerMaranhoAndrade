import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { ContainerLayoutHandler } from '../layout-handler/container-layout-handler';
import { ElementTypes } from '../data-structure-types';
import { $add } from '../../core/cytoscape/cytoscape-utils';

export class CreateContainerAction implements CytoscapeActionHandler {

  private layoutHandler: ContainerLayoutHandler = new ContainerLayoutHandler();

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const { id, size } = action.params;
    const containerElement = await $add(cytoscape, {
      data: {
        id,
        type: ElementTypes.CONTAINER,
      },
    });
    for (let i = 0; i < size; i++) {
      await $add(cytoscape, {
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
