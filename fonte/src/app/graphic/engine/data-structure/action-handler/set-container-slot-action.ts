import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { $id, $removeRelation, $addRelation } from '../../core/cytoscape/cytoscape-utils';
import { ContainerLayoutHandler } from '../layout-handler/container-layout-handler';
import { ElementTypes } from '../data-structure-types';

export class SetContainerSlotAction implements CytoscapeActionHandler {

  private layoutHandler: ContainerLayoutHandler = new ContainerLayoutHandler();

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const id: string = action.params.id;
    const index: number = action.params.index;
    const value: string = action.params.value;
    const valueElement = $id(cytoscape, value);
    const slotElement = $id(cytoscape, `${id}_${index}`);

    this.clearCurrentValue(cytoscape, slotElement);
    await this.setValue(cytoscape, slotElement, valueElement);

    await this.layoutHandler.run($id(cytoscape, id));
  }

  private clearCurrentValue(cytoscape, slotElement): void {
    const slotRelations = slotElement.neighborhood();
    if (slotRelations.length > 0) {
      $removeRelation(cytoscape, slotElement, slotRelations[0]);
    }
    const currentValueElement = slotElement.children()[0];
    if (currentValueElement) {
        cytoscape.remove(currentValueElement);
    }
  }

  private async setValue(cytoscape, slotElement, valueElement) {
    if (valueElement.data('type') === ElementTypes.PRIMITIVE) {
      await this.layoutHandler.moveToSlot(slotElement, valueElement);
      valueElement.move({parent: slotElement.id()});
    } else {
      $addRelation(cytoscape, slotElement, valueElement);
    }
  }

  name() {
    return DataStructureAction.SET_CONTAINER_SLOT.name;
  }

}
