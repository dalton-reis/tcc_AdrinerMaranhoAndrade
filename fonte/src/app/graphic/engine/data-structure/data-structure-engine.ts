import { GraphicEngine } from '../graphic-engine';
import { ToolbarItem } from '../../../models/toolbar-item';
import { ExecutionActionScope } from '../../../models/execution-action-scope';
import { CytoscapeEngine } from '../core/cytoscape/cytoscape-engine';
import { CytoscapeDefaultToolbar } from '../core/cytoscape/cytoscape-toolbar';
import { CytoscapeActionHandler } from '../core/cytoscape/cytoscape-action-handler';
import { CreateObjectAction } from './action-handler/create-object-action';
import { CreateContainerAction } from './action-handler/create-container-action';
import { CreatePrimitiveAction } from './action-handler/create-primitive-action';
import { GetContainerSlotAction } from './action-handler/get-container-slot';
import { GetObjAttrAction } from './action-handler/get-obj-attr-action';
import { SetContainerSlotAction } from './action-handler/set-container-slot-action';
import { SetObjAttrAction } from './action-handler/set-obj-attr-action';

export class DataStructureEngine implements GraphicEngine {

  cy = null;
  toolbar: ToolbarItem[] = [];
  actionHandlers: { [type: string]: CytoscapeActionHandler } = {};

  constructor(parent) {
    this.createCytoscape(parent);
    this.registerActionHandlers();
  }

  private createCytoscape(parent: HTMLDivElement) {
    if (!parent) {
      throw Error('A parent should be defined.');
    }

    this.cy = CytoscapeEngine.create(parent, {
      elements: [],
      style: [
        {
        selector: 'node[labelValue]',
        css: {
          'content': 'data(labelValue)',
          'text-wrap': 'wrap',
          'text-valign': 'center',
          'text-halign': 'center',
        },
      }],
      layout: {
        name: 'random',
        fit: true,
      },
    });

    this.toolbar = CytoscapeDefaultToolbar.create(this.cy);
  }

  private registerActionHandlers() {
    this.register(new CreateContainerAction());
    this.register(new CreateObjectAction());
    this.register(new CreatePrimitiveAction());
    this.register(new GetContainerSlotAction());
    this.register(new GetObjAttrAction());
    this.register(new SetContainerSlotAction());
    this.register(new SetObjAttrAction());
  }

  private register(actionHandler: CytoscapeActionHandler) {
    this.actionHandlers[actionHandler.name()] = actionHandler;
  }

  execute(action: ExecutionAction) {
    if (action.type.scope !== ExecutionActionScope.GRAPHIC) {
      console.error(action.type.scope);
      throw Error('invalid.action.for.scope');
    }
    const actionHandler = this.actionHandlers[action.type.name];
    if (!actionHandler) {
      console.error(action.type.name);
      throw Error('no.action.handler.defined');
    }
    actionHandler.handle(this.cy, action);
  }

  undo(): void {
    console.log('undo');
  }

  clear(): void {
    this.cy.remove(this.cy.elements());
  }

  getToolbar() {
    return this.toolbar;
  }

}
