import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { SmalgType } from '../../../../script-engine/engine/smalg-javascript/types/smalg-type';
import { $id } from '../../core/cytoscape/cytoscape-utils';
import { ObjectLayoutHandler } from '../layout-handler/object-layout-handler';

const MIN_WIDTH = 30;

export class SetObjAttrAction implements CytoscapeActionHandler {

  private layoutHandler: ObjectLayoutHandler = new ObjectLayoutHandler();

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const id: string = action.params.id;
    const name: string = action.params.name;
    const value: SmalgType = action.params.value;

    const attributeEntryValueElement = await this.getAttrValueElement(cytoscape, id, name);
    const currentValueElement = attributeEntryValueElement.children()[0];
    if (currentValueElement) cytoscape.remove(currentValueElement);
    const valueElement = $id(cytoscape, value.__getId__());
    await this.layoutHandler.moveToAttrSlot(attributeEntryValueElement, valueElement);
    valueElement.move({ parent: attributeEntryValueElement.id() });

    await this.layoutHandler.run(cytoscape, id);
  }

  private async getAttrValueElement(cytoscape: any, id: string, name: string): Promise<any> {
    const attributeEntryValueElement = $id(cytoscape, `${id}_${name}_value`);
    if (attributeEntryValueElement) return attributeEntryValueElement;
    return await this.newAttrElement(cytoscape, id, name);
  }

  private async newAttrElement(cytoscape: any, id: string, name: string): Promise<any> {
    const attrElement = cytoscape.add({
      data: {
        id: `${id}_${name}`,
        parent: id,
      },
      style: {
        'background-color': '#b0b0b0',
        'border-width': '0px',
      },
      selectable: false,
      grabbable: false,
    });

    const labelValue = `${name}:`;
    const nodeWidth = labelValue.length * 10;
    cytoscape.add({
      data: {
        id: `${attrElement.id()}_key`,
        labelValue,
        parent: attrElement.id(),
        index: 0,
      },
      style: {
        width: nodeWidth < MIN_WIDTH ? MIN_WIDTH : nodeWidth,
        shape: 'round-rectangle',
        'background-color': '#949494',
      },
      selectable: false,
      grabbable: false,
    });

    const valueElement = cytoscape.add({
      data: {
        id: `${attrElement.id()}_value`,
        parent: attrElement.id(),
        index: 1,
      },
      style: {
        width: nodeWidth < MIN_WIDTH ? MIN_WIDTH : nodeWidth,
        shape: 'rectangle',
        'background-color': '#c2c2c2',
        'border-width': '0px',
      },
      selectable: false,
      grabbable: false,
    });

    await this.layoutHandler.run(cytoscape, id);

    return valueElement;
  }

  name() {
    return DataStructureAction.SET_OBJ_ATTR.name;
  }

}
