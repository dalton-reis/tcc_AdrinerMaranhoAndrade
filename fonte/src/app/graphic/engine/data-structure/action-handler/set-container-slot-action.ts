import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { SmalgType } from '../../../../script-engine/engine/smalg-javascript/types/smalg-type';
import { $id } from '../../core/cytoscape/cytoscape-utils';
import { ContainerLayoutHandler } from '../layout-handler/container-layout-handler';

export class SetContainerSlotAction implements CytoscapeActionHandler {

  private layoutHandler: ContainerLayoutHandler = new ContainerLayoutHandler();

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const id: string = action.params.id;
    const index: number = action.params.index;
    const value: SmalgType = action.params.value;
    const valueElement = $id(cytoscape, value.__getId__());
    const slotElement = $id(cytoscape, `${id}_${index}`);

    const currentSlotElement = slotElement.children()[0];
    if (currentSlotElement) cytoscape.remove(currentSlotElement);
    this.layoutHandler.moveToSlot(slotElement, valueElement);
    valueElement.move({parent: slotElement.id()});

    await this.layoutHandler.run(cytoscape, id);
  }

  name() {
    return DataStructureAction.SET_CONTAINER_SLOT.name;
  }

}
