import { SpeedHandler } from '../speed-handler';

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
      animationDuration = SpeedHandler.speed,
    } = context;
    blockedElements.forEach(element => element.addClass('blocked'));
    return new Promise((resolve) => {
      elements.layout({
        ...options,
        stop: () => {
          blockedElements.forEach(element => element.removeClass('blocked'));
          resolve();
        },
        animate,
        animationDuration,
      }).run();
    });
  }

}
