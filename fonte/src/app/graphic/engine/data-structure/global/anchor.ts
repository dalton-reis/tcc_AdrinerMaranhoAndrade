export class Anchor {

  static id = 'anchor';
  static position = { x: 500, y: 500 };

  static get() {
    return {
      data: {
        id: Anchor.id,
      },
      locked: true,
      position: Anchor.position,
      classes: ['blocked'],
    };
  }

}
