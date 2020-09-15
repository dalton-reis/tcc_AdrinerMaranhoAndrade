export interface ScriptEngine {

  prepare(): Promise<void>;

  resume(): void;

  stop(): void;

  forward(): Promise<boolean>;

  previous(): Promise<boolean>;

  abort(): void;

}
