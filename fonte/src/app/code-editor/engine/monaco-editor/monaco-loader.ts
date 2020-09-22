// @ts-nocheck
export class MonacoLoader {

  private static loaded = false;

  static loadIfNeeded(setup: () => void, callback: () => void) {
    if (MonacoLoader.loaded) {
      callback();
      return;
    }

    const onGotAmdLoader = () => {
      (window).require(['vs/editor/editor.main'], () => {
        setup();
        MonacoLoader.loaded = true;
        callback();
      });
    };

    // Load AMD loader if necessary
    if (!(window).require) {
      const loaderScript = document.createElement('script');
      loaderScript.type = 'text/javascript';
      loaderScript.src = 'vs/loader.js';
      loaderScript.addEventListener('load', onGotAmdLoader);
      document.body.appendChild(loaderScript);
    } else {
      onGotAmdLoader();
    }
  }

}
