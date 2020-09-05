import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { $id, $removeRelation, $addRelation } from '../../core/cytoscape/cytoscape-utils';
import { ObjectLayoutHandler } from '../layout-handler/object-layout-handler';
import { ElementTypes } from '../data-structure-types';

const MIN_WIDTH = 30;

export class SetObjAttrAction implements CytoscapeActionHandler {

  private layoutHandler: ObjectLayoutHandler = new ObjectLayoutHandler();

  async handle(cytoscape: any, action: ExecutionAction): Promise<void> {
    const id: string = action.params.id;
    const name: string = action.params.name;
    const value: string = action.params.value;
    const valueElement = $id(cytoscape, value);
    const objectElement = $id(cytoscape, id);
    const attributeEntryValueElement = await this.getAttrValueElement(cytoscape, objectElement, name);

    this.clearCurrentValue(cytoscape, attributeEntryValueElement);
    await this.setValue(cytoscape, attributeEntryValueElement, valueElement);

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
    cytoscape.add({
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

  private clearCurrentValue(cytoscape, attributeEntryValueElement): void {
    const attributeValueRelations = attributeEntryValueElement.neighborhood();
    if (attributeValueRelations.length > 0) {
      $removeRelation(cytoscape, attributeEntryValueElement, attributeValueRelations[0]);
    }
    const currentValueElement = attributeEntryValueElement.children()[0];
    if (currentValueElement) {
        cytoscape.remove(currentValueElement);
    }
  }

  private async setValue(cytoscape, attributeEntryValueElement, valueElement) {
    if (valueElement.data('type') === ElementTypes.PRIMITIVE) {
      await this.layoutHandler.moveToAttrSlot(attributeEntryValueElement, valueElement);
      valueElement.move({ parent: attributeEntryValueElement.id() });
    } else {
      $addRelation(cytoscape, attributeEntryValueElement, valueElement);
    }
  }

  name() {
    return DataStructureAction.SET_OBJ_ATTR.name;
  }

}
