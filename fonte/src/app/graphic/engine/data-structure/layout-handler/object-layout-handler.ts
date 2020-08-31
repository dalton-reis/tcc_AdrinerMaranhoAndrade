import { $id } from '../../core/cytoscape/cytoscape-utils';

export class ObjectLayoutHandler {

  run(cytoscape: any, id: string) {
    const objectElement = $id(cytoscape, id);
    const notCompoundChildren = objectElement.descendants(element => element.children().length === 0);
    notCompoundChildren.layout({
      name: 'grid',
      fit: false,
      cols: 2,
      spacingFactor: .9,
    }).run();
  }

}
