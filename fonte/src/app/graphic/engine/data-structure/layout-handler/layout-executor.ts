export interface LayoutExecutorContext {

  animate?: boolean;
  animationDuration?: number;
  blockedElements?: any[];

}

export class LayoutExecutor {

  constructor() {}

  async executeLayout(elements, options, context: LayoutExecutorContext = {}): Promise<void> {
    const {
      blockedElements = [],
      animate = true,
      animationDuration = 1000,
    } = context;
    blockedElements.forEach(element => element.addClass('blocked'));
    return new Promise((resolve, reject) => {
      elements.layout({
        ...options,
        stop: () => {
          blockedElements.forEach(element => element.removeClass('blocked'));
          resolve();
        },
        animate,
        animationDuration,
      }).run();
      setTimeout(() => reject('Timeout'), animationDuration + 10000);
    });
  }

}
