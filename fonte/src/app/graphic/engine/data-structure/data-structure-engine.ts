import { GraphicEngine } from '../graphic-engine';
import { ToolbarItem } from '../../../models/toolbar-item';
import { ExecutionActionScope } from '../../../models/execution-action-scope';
import { CytoscapeEngine } from '../core/cytoscape/cytoscape-engine';
import { CytoscapeActionHandler } from '../core/cytoscape/cytoscape-action-handler';
import { CreateObjectAction } from './action-handler/create-object-action';
import { CreateContainerAction } from './action-handler/create-container-action';
import { CreatePrimitiveAction } from './action-handler/create-primitive-action';
import { GetContainerSlotAction } from './action-handler/get-container-slot';
import { GetObjAttrAction } from './action-handler/get-obj-attr-action';
import { SetContainerSlotAction } from './action-handler/set-container-slot-action';
import { SetObjAttrAction } from './action-handler/set-obj-attr-action';
import { DataScrutureEngineToolbar } from './data-structure-toolbar';
import { stylesheet } from './data-structure-stylesheet';
import { PrimitivesContainer } from './global/primitives-container';
import { DataStructureEngineStates } from './data-structure-engine-states';
import { DeleteElementAction } from './action-handler/delete-element-actions';
import { SpeedHandler } from './speed-handler';

export class DataStructureEngine implements GraphicEngine {

  cy = null;
  toolbar: ToolbarItem[] = [];
  actionHandlers: { [type: string]: CytoscapeActionHandler } = {};
  state = new DataStructureEngineStates();
  executing = false;

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
      style: stylesheet,
    });

    this.toolbar = DataScrutureEngineToolbar.create(this);
    SpeedHandler.defaultSpeed();
  }

  private registerActionHandlers() {
    this.register(new CreateContainerAction());
    this.register(new CreateObjectAction());
    this.register(new CreatePrimitiveAction());
    this.register(new GetContainerSlotAction());
    this.register(new GetObjAttrAction());
    this.register(new SetContainerSlotAction());
    this.register(new SetObjAttrAction());
    this.register(new DeleteElementAction());
  }

  private register(actionHandler: CytoscapeActionHandler) {
    this.actionHandlers[actionHandler.name()] = actionHandler;
  }

  async execute(action: ExecutionAction) {
    if (action.type.scope !== ExecutionActionScope.GRAPHIC) {
      console.error(action.type.scope);
      throw Error('invalid.action.for.scope');
    }
    const actionHandler = this.actionHandlers[action.type.name];
    if (!actionHandler) {
      console.error(action.type.name);
      throw Error('no.action.handler.defined');
    }
    if (!this.executing) {
      this.cy.add(this.globalElements());
      this.executing = true;
      this.state.saveState(this.cy.elements());
      this.center();
    }
    await actionHandler.handle(this.cy, action);
    this.state.saveState(this.cy.elements());
  }

  async undo(): Promise<boolean> {
    const previousState = this.state.backwardState();
    if (previousState) {
      this.cy.remove(this.cy.elements());
      this.cy.add(previousState);
      return true;
    }
    return false;
  }

  async clear(): Promise<void> {
    this.executing = false;
    this.state.reset();
    this.cy.remove(this.cy.elements());
  }

  center() {
    this.cy.fit();
  }

  getToolbar() {
    return this.toolbar;
  }

  private globalElements(): any[] {
    return [
      PrimitivesContainer.get(),
    ];
  }

}
