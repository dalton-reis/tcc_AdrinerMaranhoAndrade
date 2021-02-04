import { SmalgType } from './smalg-type';
import { DataStructureAction } from '../../../../models/data-structure-action';
import { SmalgPrimitive } from './smalg-primitive';
import { isPrimitive } from '../../../../utils/js-utils';

interface SmalgContainerProperties {
  size: number;
}

export class SmalgContainer extends SmalgType {

  static TYPE_DESCRIPTOR = 'smalg.js.container';

  container: SmalgType[] = [];

  constructor(private properties: SmalgContainerProperties, private actions: ExecutionAction[]) {
    super();
    this.validateProperties(properties);
    this.actions.push({
      type: DataStructureAction.CREATE_CONTAINER,
      params: { id: this.__getId__(), size: this.properties.size }});
  }

  private validateProperties(properties) {
    if (!properties.size) {
      throw Error('container.size.required');
    }
    if (properties.size <= 0) {
      throw Error('container.size.not.negative');
    }
  }

  set(index: number, value?: SmalgType | string | boolean | number) {
    this.validateIndex(index);

    if (isPrimitive(value)) {
      value = new SmalgPrimitive(value, this.actions);
    }

    value = value?.__reference__();
    this.actions.push({
      type: DataStructureAction.SET_CONTAINER_SLOT,
      params: { id: this.__getId__(), index, value: value?.__getId__() },
    });
    this.container[index] = value;
  }

  get(index: number) {
    this.validateIndex(index);

    const value = (this.container[index])?.__reference__();
    const params = { id: this.__getId__(), index, value: value?.__getId__() };
    this.actions.push({ type: DataStructureAction.GET_CONTAINER_SLOT, params });

    return value?.__value__();
  }

  size() {
    return this.properties.size;
  }

  private validateIndex(index: number) {
    if (index < 0 || index >= this.properties.size) {
      throw Error('container.index.out.of.bounds');
    }
  }

  typeDescriptor(): string {
    return SmalgContainer.TYPE_DESCRIPTOR;
  }

  __reference__(): SmalgType {
    return this;
  }

  __value__(): string | number | boolean | SmalgType {
    return this;
  }

  toString(): string {
    return JSON.stringify(this.container);
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
    const anotherContainer = another as SmalgContainer;
    if (this.container.length !== anotherContainer.container.length) {
      return false;
    }
    for (let i = 0; i < this.container.length; i++) {
      const element = this.container[i];
      const anotherElement = anotherContainer.container[i];
      if (!(element.equals ? element.equals(anotherElement) : element === anotherElement)) {
        return false;
      }
    }
    return true;
  }

}
