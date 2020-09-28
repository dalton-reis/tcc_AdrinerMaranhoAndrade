import { ClassContract, MethodContract, FieldContract } from '../../models/problem/problem-contract';

const SmalgJavascriptExecutionDeclaration = `
interface Context {
  newObject(): void;
}

declare const context: Context;
`;

export { SmalgJavascriptExecutionDeclaration };


export class AssertionDeclaration {

  static for(classContract: ClassContract) {
    const ret = `
    interface SmalgObjectReadOnly {

      get(name: string);

    }

    interface SmalgContainerReadOnly {

      get(index: number);

    }

    interface Context {

      newObject(): SmalgObjectReadOnly;

      newContainer(): SmalgContainerReadOnly;

      getObjects(): SmalgObjectReadOnly[];

      getContainers(): SmalgContainerReadOnly[];

    }

    declare const context: Context;

    interface Assertion {

      assertEquals(expected: any, actual: any, message: string): void;

      assertTrue(actual: any, message: string): void;

      assertFalse(actual: any, message: string): void;

    }

    declare const assertion: Assertion;

    ${this.createClassContractDeclaration(classContract)}
  `;
  console.log(ret);
    return ret;
  }

  private static createClassContractDeclaration(classContract: ClassContract) {
    return `
    interface ${classContract.name} {

      ${this.createFieldsSignature(classContract.fields)}

      ${this.createMethodsSignature(classContract.methods)}

    }

    declare const ${this.uncapitalizeFirstLetter(classContract.name)}: ${classContract.name};
    `;
  }

  private static createFieldsSignature(fields: FieldContract[]) {
    return fields
      .map(field => `/** ${field.description || ''} */${field.name}: any;`)
      .join('\n');
  }

  private static createMethodsSignature(methods: MethodContract[]) {
    return methods
      .map(method => `/** ${method.description || ''} */${method.name}(${method.parameters || ''}): any;`)
      .join('\n');
  }
  private static uncapitalizeFirstLetter(string: string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

}
