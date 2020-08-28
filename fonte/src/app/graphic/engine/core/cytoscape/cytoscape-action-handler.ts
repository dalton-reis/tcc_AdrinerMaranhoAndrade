export interface CytoscapeActionHandler {

  handle(cytoscape: any, action: ExecutionAction);

  name(): string;

}
