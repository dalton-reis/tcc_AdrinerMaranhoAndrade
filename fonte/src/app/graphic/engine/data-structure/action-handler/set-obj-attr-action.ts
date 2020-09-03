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

    const objectElement = $id(cytoscape, id);
    const attributeEntryValueElement = await this.getAttrValueElement(cytoscape, objectElement, name);
    const currentValueElement = attributeEntryValueElement.children()[0];
    if (currentValueElement) cytoscape.remove(currentValueElement);
    const valueElement = $id(cytoscape, value.__getId__());
    await this.layoutHandler.moveToAttrSlot(attributeEntryValueElement, valueElement);
    valueElement.move({ parent: attributeEntryValueElement.id() });

    await this.layoutHandler.run($id(cytoscape, id));
  }

  private async getAttrValueElement(cytoscape: any, objectElement: any, name: string): Promise<any> {
    const id = objectElement.id();
    const attributeEntryValueElement = $id(cytoscape, `${id}_${name}_value`);
    if (attributeEntryValueElement) return attributeEntryValueElement;
    return await this.newAttrElement(cytoscape, objectElement, name);
  }

  private async newAttrElement(cytoscape: any, objectElement: any, name: string): Promise<any> {
    const id = objectElement.id();
    const attrElement = cytoscape.add({
      data: {
        id: `${id}_${name}`,
      },
      classes: ['entry'],
    });

    const labelValue = `${name}:`;
    const nodeWidth = labelValue.length * 10;
    const attrElementKey = cytoscape.add({
      data: {
        id: `${attrElement.id()}_key`,
        labelValue,
        index: 0,
        parent: attrElement.id(),
        nodeWidth: nodeWidth < MIN_WIDTH ? MIN_WIDTH : nodeWidth,
      },
      classes: ['entry-key'],
    });

    const attrElementValue = cytoscape.add({
      data: {
        id: `${attrElement.id()}_value`,
        index: 1,
        parent: attrElement.id(),
      },
      classes: ['slot'],
    });

    await this.layoutHandler.onCreateAttr(objectElement, attrElement);
    attrElement.move({ parent: id });
    await this.layoutHandler.run(objectElement);

    return attrElementValue;
  }

  name() {
    return DataStructureAction.SET_OBJ_ATTR.name;
  }

}
