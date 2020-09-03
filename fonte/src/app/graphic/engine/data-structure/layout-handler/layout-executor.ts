export class LayoutExecutor {

  constructor() {}

  async executeLayout(elements, options): Promise<void> {
    return new Promise((resolve) => {
      elements.layout({
        ...options,
        stop: () => resolve(),
        animate: true,
        animationDuration: 1000,
      }).run();
    });
  }

}
