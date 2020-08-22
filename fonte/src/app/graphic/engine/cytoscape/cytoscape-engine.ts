import cytoscape from 'cytoscape';
import { GraphicEngine } from '../graphic-engine';

export class CytoscapeEngine implements GraphicEngine {

  cy = null;

  init(parent: HTMLDivElement) {
    if (!parent) {
      throw Error('A parent should be defined.');
    }
    this.cy = cytoscape({
      // very commonly used options
      container: parent,
      elements: [{
        group: 'nodes',
        data: { weight: 75 },
        position: { x: 200, y: 200 }
      }],
      style: [ /* ... */ ],
      layout: { name: 'grid' /* , ... */ },

      // initial viewport state:
      zoom: 1,
      pan: { x: 0, y: 0 },

      // interaction options:
      minZoom: 1e-50,
      maxZoom: 1e50,
      zoomingEnabled: true,
      userZoomingEnabled: true,
      panningEnabled: true,
      userPanningEnabled: true,
      boxSelectionEnabled: true,
      selectionType: 'single',
      touchTapThreshold: 8,
      desktopTapThreshold: 4,
      autolock: false,
      autoungrabify: false,
      autounselectify: false,

      // rendering options:
      headless: false,
      styleEnabled: true,
      hideEdgesOnViewport: false,
      textureOnViewport: false,
      motionBlur: false,
      motionBlurOpacity: 0.2,
      wheelSensitivity: 1,
      pixelRatio: 'auto'
    });

    this.cy.resize();
    console.log(this.cy);
  }

}
