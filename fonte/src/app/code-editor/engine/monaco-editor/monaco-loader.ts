// @ts-nocheck
export class MonacoLoader {

  private static loaded = false;
  private static loading = false;
  private static onLoadListeners = [];

  static loadIfNeeded(setup: () => void, callback: () => void) {
    if (MonacoLoader.loaded) {
      callback();
      return;
    }
    if (MonacoLoader.loading) {
      MonacoLoader.onLoadListeners.push(callback);
      return;
    }

    MonacoLoader.loading = true;
    MonacoLoader.onLoadListeners.push(callback);

    const onGotAmdLoader = () => {
      (window).require(['vs/editor/editor.main'], () => {
        setup();
        MonacoLoader.loaded = true;
        MonacoLoader.loading = false;
        MonacoLoader.onLoadListeners.forEach(listener => listener());
        MonacoLoader.onLoadListeners = [];
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
