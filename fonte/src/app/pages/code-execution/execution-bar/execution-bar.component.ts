import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ExecutionBarState } from '../../../models/execution-bar-event/execution-bar-state';
import { ExecutionBarEvent } from '../../../models/execution-bar-event/execution-bar-event';

@Component({
  selector: 'app-execution-bar',
  templateUrl: './execution-bar.component.html',
  styleUrls: ['./execution-bar.component.scss']
})
export class ExecutionBarComponent implements OnInit {

  @Output() stateChanged = new EventEmitter<ExecutionBarEvent>();

  currentState: ExecutionBarState = null;
  message: string;
  messageTimeout: NodeJS.Timeout;

  BUTTONS = [{
    icon: 'stop',
    state: ExecutionBarState.STOP,
    enabledStates: [
      ExecutionBarState.STEP_BACWARD,
      ExecutionBarState.PLAY,
      ExecutionBarState.PAUSE,
      ExecutionBarState.STEP_FORWARD,
    ],
    enabled: false,
    tooltip: 'Parar',
  }, {
    icon: 'step-backward',
    state: ExecutionBarState.STEP_BACWARD,
    enabledStates: [ ExecutionBarState.PAUSE ],
    enabled: false,
    tooltip: 'Passo anterior',
  }, {
    icon: 'play',
    state: ExecutionBarState.PLAY,
    enabledStates: [ ExecutionBarState.STOP, ExecutionBarState.PAUSE ],
    enabled: false,
    tooltip: 'Resumir',
  }, {
    icon: 'pause',
    state: ExecutionBarState.PAUSE,
    enabledStates: [ ExecutionBarState.PLAY ],
    enabled: false,
    tooltip: 'Pausar',
  }, {
    icon: 'step-forward',
    state: ExecutionBarState.STEP_FORWARD,
    enabledStates: [ ExecutionBarState.PAUSE ],
    enabled: false,
    tooltip: 'Próximo passo',
  }];

  constructor() {}

  ngOnInit(): void {
    this.changeState(ExecutionBarState.PAUSE);
  }

  changeState(newState: ExecutionBarState) {
    if (this.currentState !== newState) {
      this.message = null;
      this.currentState = newState;
      this.BUTTONS.forEach(button =>
        button.enabled = this.currentState === button.state || button.enabledStates.includes(this.currentState));
      this.stateChanged.emit({ state: newState });
    }
  }

  popUpMessage(message: string, duration: number = 3000) {
    if (this.messageTimeout) {
      clearTimeout(this.messageTimeout);
    }
    this.message = message;
    this.messageTimeout = setTimeout(() => this.message = null, duration);
  }

  buttonId(_, button) {
    return button.state;
  }

}
