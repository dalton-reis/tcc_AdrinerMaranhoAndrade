import cytoscape from 'cytoscape';

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
