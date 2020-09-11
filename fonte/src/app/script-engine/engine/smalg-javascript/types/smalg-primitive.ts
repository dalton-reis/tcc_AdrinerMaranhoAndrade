import { SmalgType } from './smalg-type';
import { DataStructureAction } from '../../../../models/data-structure-action';

const ALLOWED_TYPES = ['string', 'boolean', 'number'];

export class SmalgPrimitive extends SmalgType {

  static TYPE_DESCRIPTOR = 'smalg.js.primitive';

  private type: string;

  constructor(
    private value: string | number | boolean,
    private actions: ExecutionAction[],
    copiedFrom?: SmalgPrimitive,
  ) {
    super();
    this.type = this.getType(value);
    actions.push({
      type: DataStructureAction.CREATE_PRIMITIVE,
      params: {
        id: this.__getId__(),
        type: this.type,
        value: this.value,
        copiedFrom: copiedFrom?.__getId__(),
      },
    });
  }

  private getType(value): string {
    const type = typeof value;
    if (ALLOWED_TYPES.includes(type))  {
      return type;
    }
    throw Error('not.allowed.type');
  }

  getValue(): string | number | boolean {
    return this.value;
  }

  typeDescriptor(): string {
    return SmalgPrimitive.TYPE_DESCRIPTOR;
  }

  __reference__(): SmalgType {
    return new SmalgPrimitive(this.value, this.actions, this);
  }

}
