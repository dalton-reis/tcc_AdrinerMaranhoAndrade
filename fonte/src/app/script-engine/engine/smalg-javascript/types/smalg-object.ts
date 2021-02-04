import { SmalgType } from './smalg-type';
import { DataStructureAction } from '../../../../models/data-structure-action';
import { SmalgPrimitive } from './smalg-primitive';
import { isPrimitive } from '../../../../utils/js-utils';

export class SmalgObject extends SmalgType {

  static TYPE_DESCRIPTOR = 'smalg.js.object';

  obj: { [key: string]: SmalgType } = {};

  constructor(private actions: ExecutionAction[]) {
    super();
    this.actions.push({ type: DataStructureAction.CREATE_OBJECT, params: { id: this.__getId__() } });
  }

  set(name: string, value?: SmalgType | string | boolean | number) {
    if (isPrimitive(value)) {
      value = new SmalgPrimitive(value, this.actions);
    }
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
    return value?.__value__();
  }

  typeDescriptor(): string {
    return SmalgObject.TYPE_DESCRIPTOR;
  }

  __reference__(): SmalgType {
    return this;
  }

  __value__(): string | number | boolean | SmalgType {
    return this;
  }

  toString() {
    return JSON.stringify(this.obj);
  }

  equals(another: any) {
    if (!another) {
      return false;
    }
    if (this === another) {
      return true;
    }
    if (!another.typeDescriptor) {
      return false;
    }
    if (this.typeDescriptor() !== another.typeDescriptor()) {
      return false;
    }
    const anotherObject = another as SmalgObject;
    const objectKeys = Object.keys(this.obj);
    const anotherObjectKeys = Object.keys(anotherObject.obj);
    if (objectKeys.length !== anotherObjectKeys.length) {
      return false;
    }
    if (objectKeys.filter(objKey => !anotherObjectKeys.includes(objKey)).length > 0) {
      return false;
    }
    for (const objKey of objectKeys) {
      const element = this.obj[objKey];
      const anotherElement = anotherObject.obj[objKey];
      if (!(element.equals ? element.equals(anotherElement) : element === anotherElement)) {
        return false;
      }
    }
    return true;
  }

}
