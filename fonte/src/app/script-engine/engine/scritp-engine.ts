export interface ScriptEngine {

  resume(): void;

  stop(): void;

  forward(): Promise<boolean>;

  previous(): Promise<boolean>;

  abort(): void;

}
