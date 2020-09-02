import { SmalgType } from './smalg-type';
import { DataStructureAction } from '../../../../models/data-structure-action';

export class SmalgObject extends SmalgType {

  static TYPE_DESCRIPTOR = 'smalg.js.object';

  private obj = {};

  constructor(private actions: ExecutionAction[]) {
    super();
    this.actions.push({ type: DataStructureAction.CREATE_OBJECT, params: { id: this.__getId__() } });
  }

  setAttribute(name: string, value: SmalgType) {
    this.actions.push({ type: DataStructureAction.SET_OBJ_ATTR, params: { id: this.__getId__(), name, value } });
    this.obj[name] = value;
  }

  getAttribute(name: string) {
    this.actions.push({ type: DataStructureAction.GET_OBJ_ATTR, params: { id: this.__getId__(), name } });
    return this.obj[name];
  }

  typeDescriptor(): string {
    return SmalgObject.TYPE_DESCRIPTOR;
  }

}
