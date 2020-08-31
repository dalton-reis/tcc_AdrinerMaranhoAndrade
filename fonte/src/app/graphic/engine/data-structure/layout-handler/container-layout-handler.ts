import { $id } from '../../core/cytoscape/cytoscape-utils';

export class ContainerLayoutHandler {

  moveToSlot(slotElement: any, valueElement: any) {
    valueElement.layout({
      name: 'grid',
      fit: false,
      boundingBox: slotElement.boundingBox(),
      animate: true,
      animationDuration: 200,
    }).run();
  }

  run(cytoscape: any, id: string) {
    const containerElement = $id(cytoscape, id);
    // Grid layout does not apply for compound nodes.
    const notCompoundChildren = containerElement.descendants(element => element.children().length === 0);
    notCompoundChildren.layout({
      name: 'grid',
      fit: false,
      rows: 1,
      cols: notCompoundChildren.length,
      animate: true,
      animationDuration: 200,
    }).run();
  }

}
