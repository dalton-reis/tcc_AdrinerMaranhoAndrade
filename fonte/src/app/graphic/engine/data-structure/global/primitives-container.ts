export class PrimitivesContainer {

  static id = 'primitives-container';

  static get() {
    return {
      data: {
        id: PrimitivesContainer.id,
        label: 'Valores Imutáveis',
      },
      position: { x: 0, y: 0 },
    };
  }

}
