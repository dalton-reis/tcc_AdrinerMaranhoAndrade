import { GraphicEngine } from './graphic-engine';
import { DataStructureEngine } from './data-structure/data-structure-engine';

export class GraphicEngineProvider {

  private constructor() {}

  private static ENGINES = {
    'data-structure': parent => new DataStructureEngine(parent),
  };

  static create(engineName: string, parent: HTMLDivElement): GraphicEngine {
    const engineProvider = this.ENGINES[engineName];
    if (!engineProvider) {
      throw Error(`Engine not specified: ${engineName}`);
    }
    return engineProvider(parent);
  }

  static default(): string {
    return 'data-structure';
  }

}
