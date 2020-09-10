import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { $id } from '../../core/cytoscape/cytoscape-utils';
import { ElementTypes } from '../data-structure-types';
import { ContainerLayoutHandler } from '../layout-handler/container-layout-handler';
import { PrimitiveLayoutHandler } from '../layout-handler/primitive-layout-handler';

export class GetContainerSlotAction implements CytoscapeActionHandler {

  private primitiveLayoutHandler: PrimitiveLayoutHandler = new PrimitiveLayoutHandler();

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const id: string = action.params.id;
    const index: number = action.params.index;
    const value: string = action.params.value;
    const valueElement = $id(cytoscape, value);
    const containerSlot = $id(cytoscape, `${id}_${index}`);
    containerSlot.addClass('selected');
    valueElement.addClass('selected');
    await new Promise(resolve => setTimeout(() => resolve(), 1500));
    containerSlot.removeClass('selected');
    valueElement.removeClass('selected');
    if (valueElement.data('type') === ElementTypes.PRIMITIVE) {
      await this.primitiveLayoutHandler.moveToPrimitivesContainer(cytoscape, valueElement);
    }
  }

  name() {
    return DataStructureAction.GET_CONTAINER_SLOT.name;
  }

}
