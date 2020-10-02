import { ClassContract, MethodContract, FieldContract } from '../../../models/problem/problem-contract';

const SmalgJavascriptExecutionDeclaration = `
interface Context {
  newObject(): void;
}

declare const context: Context;
`;

export { SmalgJavascriptExecutionDeclaration };

const uncapitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};
export { uncapitalizeFirstLetter };

export class ExecutionDeclaration {

  static for(classContract: ClassContract) {
    return `class ${classContract.name} {\n\n\tconstructor() {}\n\n${this.generateFields(classContract.fields)}\n\n${this.generateMethods(classContract.methods)}\n\n}`;
  }

  private static generateFields(fields: FieldContract[]) {
    return fields.map(field =>
      `\t${this.generateDocumentation(field.description)}${field.name};`).join('\n');
  }

  private static generateMethods(methods: MethodContract[]): string {
    return methods.map(method =>
      `\t${this.generateDocumentation(method.description)}${method.name}(${method.parameters}) {\n\t\t\n\t}`).join('\n');
  }

  private static generateDocumentation(description: string) {
    return description ? `/**\n\t * ${description}\n\t */\n\t` : '';
  }

}

export class AssertionDeclaration {

  static for(classContract: ClassContract) {
    return `
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
  }

  private static createClassContractDeclaration(classContract: ClassContract) {
    return `
    interface ${classContract.name} {

      ${this.createFieldsSignature(classContract.fields)}

      ${this.createMethodsSignature(classContract.methods)}

    }

    declare const ${uncapitalizeFirstLetter(classContract.name)}: ${classContract.name};
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

}
