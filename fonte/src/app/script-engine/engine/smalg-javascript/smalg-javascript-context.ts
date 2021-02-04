import { SmalgContainer } from './types/smalg-container';
import { SmalgObject } from './types/smalg-object';
import { SmalgPrimitive } from './types/smalg-primitive';
import { SmalgType } from './types/smalg-type';
import { DataStructureAction } from '../../../models/data-structure-action';

export class SmalgJavascriptContext {

  private elements: { [key: string]: SmalgType } = {};

  constructor(private actions: ExecutionAction[]) {}

  newObject() {
    return this.createNewElement(() => new SmalgObject(this.actions));
  }

  newContainer(size: number) {
    return this.createNewElement(() => new SmalgContainer({ size }, this.actions));
  }

  newPrimitive(value: string | number | boolean) {
    return this.createNewElement(() => new SmalgPrimitive(value, this.actions));
  }

  clear(elems: SmalgType | SmalgType[]) {
    if (!elems) {
      return;
    }
    if (Array.isArray(elems)) {
      elems.forEach(elem => this.clearElement(elem));
    } else {
      this.clearElement(elems);
    }
  }

  private clearElement(elem: SmalgType) {
    if (!elem.__getId__) {
      console.warn('A non Smalg type was passed by parameter to clear.', elem);
      return;
    }
    this.actions.push({
      type: DataStructureAction.DELETE_ELEMENT,
      params: { id: elem.__getId__() },
    });
    delete this.elements[elem.__getId__()];
  }

  getObjects() {
    return this.getElementsByType(SmalgObject.TYPE_DESCRIPTOR);
  }

  getContainers() {
    return this.getElementsByType(SmalgContainer.TYPE_DESCRIPTOR);
  }

  getPrimitives() {
    return this.getElementsByType(SmalgPrimitive.TYPE_DESCRIPTOR);
  }

  private getElementsByType(typeDescriptor: string) {
    return Object.values(this.elements)
    .filter(elem => elem.typeDescriptor() === typeDescriptor);
  }

  private createNewElement(elementProvider: () => SmalgType): SmalgType {
    const elem = elementProvider();
    this.elements[elem.__getId__()] = elem;
    return elem;
  }

}
