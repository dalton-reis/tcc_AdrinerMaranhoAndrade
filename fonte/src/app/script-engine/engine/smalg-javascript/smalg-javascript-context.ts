import { SmalgContainer } from './types/smalg-container';
import { SmalgObject } from './types/smalg-object';
import { SmalgPrimitive } from './types/smalg-primitive';

export class SmalgJavascriptContext {

  constructor(private actions: GraphicAction[]) {}

  newObject() {
    return new SmalgObject(this.actions);
  }

  newContainer(size: number) {
    return new SmalgContainer({ size }, this.actions);
  }

  newPrimitive(value: string | number | boolean) {
    return new SmalgPrimitive(value, this.actions);
  }

}
