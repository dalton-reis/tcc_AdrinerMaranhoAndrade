export class PrimitivesContainer {

  static id = 'primitives-container';
  static position = { x: 50, y: 50 };

  static get() {
    return {
      data: {
        id: PrimitivesContainer.id,
        label: 'Valores Imutáveis',
      },
      locked: true,
      position: PrimitivesContainer.position,
      classes: ['blocked'],
    };
  }

}
