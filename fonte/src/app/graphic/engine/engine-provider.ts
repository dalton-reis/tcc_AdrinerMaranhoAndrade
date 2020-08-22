import { CytoscapeEngine } from './cytoscape/cytoscape-engine';
import { GraphicEngine } from './graphic-engine';

export class EngineProvider {

  private EngineProvider() {}

  private static ENGINES = {
    'cytoscape': parent => new CytoscapeEngine(parent),
  };

  static create(engineName: string, parent: HTMLDivElement): GraphicEngine {
    const engineProvider = this.ENGINES[engineName];
    if (!engineProvider) {
      throw Error(`Engine not specified: ${engineName}`);
    }
    return engineProvider(parent);
  }

  static default(): string {
    return 'cytoscape';
  }

}
