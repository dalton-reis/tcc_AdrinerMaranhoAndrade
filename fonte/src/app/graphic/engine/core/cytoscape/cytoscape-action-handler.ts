export interface CytoscapeActionHandler {

  handle(cytoscape: any, action: ExecutionAction): Promise<void>;

  name(): string;

}
