interface ExecutionAction {

  type: { scope: string, name: string };
  params?: {[name: string]: any };

}
