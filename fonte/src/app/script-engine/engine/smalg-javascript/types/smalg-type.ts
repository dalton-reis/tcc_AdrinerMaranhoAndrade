import { v4 as uuidV4 } from 'uuid';

export class SmalgType {

  private id = uuidV4();

  __getId__() {
    return this.id;
  }

}
