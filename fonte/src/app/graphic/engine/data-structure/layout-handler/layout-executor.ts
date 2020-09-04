export interface LayoutExecutorContext {
  blockedElements?: any[];
}

export class LayoutExecutor {

  constructor() {}

  async executeLayout(elements, options, context: LayoutExecutorContext = {}): Promise<void> {
    const { blockedElements = [] } = context;
    blockedElements.forEach(element => element.addClass('blocked'));
    return new Promise((resolve) => {
      elements.layout({
        ...options,
        stop: () => {
          blockedElements.forEach(element => element.removeClass('blocked'));
          resolve();
        },
        animate: true,
        animationDuration: 1000,
      }).run();
    });
  }

}
