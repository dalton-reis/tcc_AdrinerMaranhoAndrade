import { SmalgType } from './smalg-type';
import { DataStructureAction } from '../../../../models/data-structure-action';

interface SmalgContainerProperties {
  size: number;
}

export class SmalgContainer extends SmalgType {

  static TYPE_DESCRIPTOR = 'smalg.js.container';

  private container: SmalgType[] = [];

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

  set(index: number, value: SmalgType) {
    this.validateIndex(index);

    value = value.__reference__();
    this.actions.push({
      type: DataStructureAction.SET_CONTAINER_SLOT,
      params: { id: this.__getId__(), index, value: value.__getId__() },
    });
    this.container[index] = value;
  }

  get(index: number) {
    this.validateIndex(index);

    const value = this.container[index].__reference__();
    const params = { id: this.__getId__(), index, value: value.__getId__() };
    this.actions.push({ type: DataStructureAction.GET_CONTAINER_SLOT, params });

    return value;
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

}
