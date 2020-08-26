export interface CompiledScript {

  engine(): string;

  execute(context: any): void;

}
