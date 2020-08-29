import { DataStructureAction } from '../../../../models/data-structure-action';
import { CytoscapeActionHandler } from '../../core/cytoscape/cytoscape-action-handler';
import { SmalgType } from '../../../../script-engine/engine/smalg-javascript/types/smalg-type';
import { $id } from '../../core/cytoscape/cytoscape-utils';

const MIN_WIDTH = 30;

export class SetObjAttrAction implements CytoscapeActionHandler {

  handle(cytoscape: any, action: ExecutionAction) {
    const id: string = action.params.id;
    const name: string = action.params.name;
    const value: SmalgType = action.params.value;

    const attributeEntryValueElement = this.getAttrValueElement(cytoscape, id, name);
    const currentValueElement = attributeEntryValueElement.children()[0];
    if (currentValueElement) currentValueElement.move({ parent: null });
    const valueElement = $id(cytoscape, value.__getId__());
    valueElement.move({ parent: attributeEntryValueElement.id() });
  }

  private getAttrValueElement(cytoscape: any, id: string, name: string) {
    const attributeEntryValueElement = $id(cytoscape, `${id}_${name}_value`);
    if (attributeEntryValueElement) return attributeEntryValueElement;
    return this.newAttrElement(cytoscape, id, name);
  }

  private newAttrElement(cytoscape: any, id: string, name: string) {
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
      },
      style: {
        width: nodeWidth < MIN_WIDTH ? MIN_WIDTH : nodeWidth,
        shape: 'round-rectangle',
        'background-color': '#949494',
      },
    });

    const valueElement = cytoscape.add({
      data: {
        id: `${attrElement.id()}_value`,
        parent: attrElement.id(),
      },
      style: {
        width: nodeWidth < MIN_WIDTH ? MIN_WIDTH : nodeWidth,
        shape: 'round-rectangle',
        'background-color': '#c2c2c2',
        'border-width': '2px',
        'border-style': 'solid',
        'border-color': '#999999',
      },
    });

    return valueElement;
  }

  name() {
    return DataStructureAction.SET_OBJ_ATTR.name;
  }

}
