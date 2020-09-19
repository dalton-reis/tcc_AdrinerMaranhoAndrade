export interface ScriptEngine {

  prepare(): Promise<void>;

  resume(): Promise<boolean>;

  stop(): void;

  forward(): Promise<boolean>;

  previous(): Promise<boolean>;

  abort(): void;

}
