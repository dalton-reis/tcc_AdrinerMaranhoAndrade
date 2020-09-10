import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { $id } from '../../core/cytoscape/cytoscape-utils';
import { ElementTypes } from '../data-structure-types';
import { PrimitiveLayoutHandler } from '../layout-handler/primitive-layout-handler';

export class GetObjAttrAction implements CytoscapeActionHandler {

  private primitiveLayoutHandler: PrimitiveLayoutHandler = new PrimitiveLayoutHandler();

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const id: string = action.params.id;
    const name: string = action.params.name;
    const value: string = action.params.value;
    const objectAttr = $id(cytoscape, `${id}_${name}_value`);
    if (objectAttr) {
      objectAttr.addClass('selected');
      await new Promise(resolve => setTimeout(() => resolve(), 1500));
      objectAttr.removeClass('selected');
      const valueElement = value && $id(cytoscape, value);
      if (valueElement.data('type') === ElementTypes.PRIMITIVE) {
        await this.primitiveLayoutHandler.moveToPrimitivesContainer(cytoscape, valueElement);
      }
    }
  }

  name() {
    return DataStructureAction.GET_OBJ_ATTR.name;
  }

}
