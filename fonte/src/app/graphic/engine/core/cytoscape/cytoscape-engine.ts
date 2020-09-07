import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import coseBilkent from 'cytoscape-cose-bilkent';

cytoscape.use(cola);
cytoscape.use( coseBilkent );

export class CytoscapeEngine {

  private constructor() {}

  static create(parent: HTMLDivElement, options: any): any {
    parent.style.height = '100%';
    parent.style.width = '100%';
    return cytoscape({
      ...options,
      container: parent,
    });
  }

}
