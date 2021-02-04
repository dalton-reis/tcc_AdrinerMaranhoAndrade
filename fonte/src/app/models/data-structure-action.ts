import { ExecutionActionType } from './execution-action-type';
import { ExecutionActionScope } from './execution-action-scope';

export class DataStructureAction {

  static CREATE_OBJECT = DataStructureAction.action('CREATE_OBJECT');
  static CLONE_TYPE = DataStructureAction.action('CLONE_TYPE');
  static SET_OBJ_ATTR = DataStructureAction.action('SET_OBJ_ATTR');
  static GET_OBJ_ATTR = DataStructureAction.action('GET_OBJ_ATTR');
  static CREATE_CONTAINER = DataStructureAction.action('CREATE_CONTAINER');
  static SET_CONTAINER_SLOT = DataStructureAction.action('SET_CONTAINER_SLOT');
  static GET_CONTAINER_SLOT = DataStructureAction.action('GET_CONTAINER_SLOT');
  static CREATE_PRIMITIVE = DataStructureAction.action('CREATE_PRIMITIVE');
  static DELETE_ELEMENT = DataStructureAction.action('DELETE_ELEMENT');

  private static action(name: string): ExecutionActionType {
    return Object.freeze({ scope: ExecutionActionScope.GRAPHIC, name });
  }

}
