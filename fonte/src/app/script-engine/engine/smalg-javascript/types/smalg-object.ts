import { SmalgType } from './smalg-type';
import { DataStructureAction } from '../../../../models/data-structure-action';

export class SmalgObject extends SmalgType {

  static TYPE_DESCRIPTOR = 'smalg.js.object';

  private obj: { [key: string]: SmalgType } = {};

  constructor(private actions: ExecutionAction[]) {
    super();
    this.actions.push({ type: DataStructureAction.CREATE_OBJECT, params: { id: this.__getId__() } });
  }

  set(name: string, value?: SmalgType) {
    value = value?.__reference__();

    this.actions.push({
      type: DataStructureAction.SET_OBJ_ATTR,
      params: { id: this.__getId__(), name, value: value?.__getId__() },
    });
    this.obj[name] = value;
  }

  get(name: string) {
    const value = this.obj[name]?.__reference__();
    const params = { id: this.__getId__(), name, value: value?.__getId__() };
    this.actions.push({ type: DataStructureAction.GET_OBJ_ATTR, params });
    return value;
  }

  typeDescriptor(): string {
    return SmalgObject.TYPE_DESCRIPTOR;
  }

  __reference__(): SmalgType {
    return this;
  }

}
