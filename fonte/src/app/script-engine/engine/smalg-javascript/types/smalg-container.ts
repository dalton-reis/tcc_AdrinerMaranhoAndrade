import { SmalgType } from './smalg-type';

interface SmalgContainerProperties {
  size: number;
}

export class SmalgContainer extends SmalgType {

  private container = [];

  constructor(private properties: SmalgContainerProperties, private actions: GraphicAction[]) {
    super();
    this.validateProperties(properties);
    this.actions.push({ type: 'CREATE_CONTAINER', params: { id: this.__getId__(), size: this.properties.size } });
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
    this.actions.push({ type: 'SET_CONTAINER_SLOT', params: { id: this.__getId__(), index, value } });
    this.container[index] = value;
  }

  get(index: number) {
    this.actions.push({ type: 'GET_CONTAINER_SLOT', params: { id: this.__getId__(), name } });
    return this.container[index];
  }

}
