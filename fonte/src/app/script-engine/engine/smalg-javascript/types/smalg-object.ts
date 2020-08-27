import { SmalgType } from './smalg-type';

export class SmalgObject extends SmalgType {

  private obj = {};

  constructor(private actions: GraphicAction[]) {
    super();
    this.actions.push({ type: 'CREATE_OBJECT', params: { id: this.__getId__() } });
  }

  setAttribute(name: string, value: SmalgType) {
    this.actions.push({ type: 'SET_OBJ_ATTR', params: { id: this.__getId__(), name, value } });
    this.obj[name] = value;
  }

  getAttribute(name: string) {
    this.actions.push({ type: 'GET_OBJ_ATTR', params: { id: this.__getId__(), name } });
    return this.obj[name];
  }

}
