export class DataStructureEngineStates {

  private states = [];
  private index = -1;

  constructor() {}

  saveState(elements) {
    this.index++;
    if (!this.states[this.index]) {
      this.states.push(elements.clone());
    }
  }

  currentState() {
    if (this.index >= 0) {
      return this.states[this.index];
    }
    return null;
  }

  backwardState(): any {
    if (this.index >= 0) {
      this.index--;
      return this.states[this.index];
    }
    return null;
  }

  reset() {
    this.states = [];
    this.index = -1;
  }

}
