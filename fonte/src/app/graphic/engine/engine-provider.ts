import { CytoscapeEngine } from './cytoscape/cytoscape-engine';
import { GraphicEngine } from './graphic-engine';

export class EngineProvider {

  private EngineProvider() {}

  private static ENGINES = {
    'cytoscape': () => new CytoscapeEngine(),
  };

  static get(engineName: string): GraphicEngine {
    const engineProvider = this.ENGINES[engineName];
    if (!engineProvider) {
      throw Error(`Engine not specified: ${engineName}`);
    }
    return engineProvider();
  }

  static default(): string {
    return 'cytoscape';
  }

}
