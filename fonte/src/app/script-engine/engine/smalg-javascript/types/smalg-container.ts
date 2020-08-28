import { SmalgType } from './smalg-type';
import { DataStructureAction } from '../../../../models/data-structure-action';

interface SmalgContainerProperties {
  size: number;
}

export class SmalgContainer extends SmalgType {

  private container = [];

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
    if (index < 0 || index >= this.properties.size) {
      throw Error('container.index.out.of.bounds');
    }
    this.actions.push({
      type: DataStructureAction.SET_CONTAINER_SLOT, params: { id: this.__getId__(), index, value },
    });
    this.container[index] = value;
  }

  get(index: number) {
    this.actions.push({
      type: DataStructureAction.GET_CONTAINER_SLOT, params: { id: this.__getId__(), index },
    });
    return this.container[index];
  }

}
