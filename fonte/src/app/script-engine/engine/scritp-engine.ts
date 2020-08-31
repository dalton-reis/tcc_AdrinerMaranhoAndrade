export interface ScriptEngine {

  execute(): void;

  stop(): void;

  forward(): Promise<void>;

  previous(): Promise<void>;

  abort(): void;

}
