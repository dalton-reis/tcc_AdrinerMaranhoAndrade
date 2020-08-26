import { GraphicEngine } from '../../../graphic/engine/graphic-engine';

export class SmalgJavascriptContext {

  constructor(private actions: GraphicAction[]) {}

  novoObjeto() {
    this.actions.push({ type: 'CREATE_OBJECT' });
  }

  novoContainer() {
    this.actions.push({ type: 'CREATE_CONTAINER' });
  }

}
