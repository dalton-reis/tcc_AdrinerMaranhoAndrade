import { v4 as uuidV4 } from 'uuid';

export abstract class SmalgType {

  private id = uuidV4();

  __getId__() {
    return this.id;
  }

  abstract __reference__(): SmalgType;

  abstract typeDescriptor(): string;

}
