import cytoscape from 'cytoscape';
import { GraphicEngine } from '../graphic-engine';
import { CytoscapeToolbar } from './cytoscape-toolbar';
import { ToolbarItem } from '../../../@core/data/toolbar-item';

export class CytoscapeEngine implements GraphicEngine {

  cy = null;
  toolbar: ToolbarItem[] = [];

  constructor(parent) {
    this.init(parent);
  }

  private init(parent: HTMLDivElement) {
    if (!parent) {
      throw Error('A parent should be defined.');
    }
    parent.style.height = '100%';
    parent.style.width = '100%';
    this.cy = cytoscape({
      // very commonly used options
      container: parent,
      elements: [{
        group: 'nodes',
        data: { weight: 75 },
        position: { x: 400, y: 200 },
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

    this.toolbar = CytoscapeToolbar.create(this.cy);
  }

  execute(action: GraphicAction) {
    console.log(action);
  }

  undo(): void {
    console.log('undo');
  }

  clear(): void {
    console.log('clear');
  }

  getToolbar() {
    return this.toolbar;
  }

}
