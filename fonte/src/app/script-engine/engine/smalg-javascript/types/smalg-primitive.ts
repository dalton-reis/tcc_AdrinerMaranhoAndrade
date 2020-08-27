import { SmalgType } from './smalg-type';

const ALLOWED_TYPES = ['string', 'boolean', 'number'];

export class SmalgPrimitive extends SmalgType {

  private type: string;

  constructor(private value: string | number | boolean, private actions: GraphicAction[]) {
    super();
    this.type = this.getType(value);
    actions.push({ type: 'CREATE_PRIMITIVE', params: { id: this.__getId__(), type: this.type, value: this.value } });
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

}
