import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ExecutionBarState } from '../../../models/execution-bar-event/execution-bar-state';
import { ExecutionBarEvent } from '../../../models/execution-bar-event/execution-bar-event';

@Component({
  selector: 'app-execution-bar',
  templateUrl: './execution-bar.component.html',
  styleUrls: ['./execution-bar.component.scss']
})
export class ExecutionBarComponent implements OnInit {

  @Output() stateChangedEmitter = new EventEmitter<ExecutionBarEvent>();

  currentState: ExecutionBarState = ExecutionBarState.STOP;

  BUTTONS = [{
    icon: 'stop',
    state: ExecutionBarState.STOP,
  }, {
    icon: 'step-backward',
    state: ExecutionBarState.STEP_BACWARD,
  }, {
    icon: 'play',
    state: ExecutionBarState.PLAY,
  }, {
    icon: 'pause',
    state: ExecutionBarState.PAUSE,
  }, {
    icon: 'step-forward',
    state: ExecutionBarState.STEP_FORWARD,
  }];

  constructor() {}

  ngOnInit(): void {
  }

  changeState(newState: ExecutionBarState) {
    if (this.currentState !== newState) {
      this.currentState = newState;
      this.stateChangedEmitter.emit({ state: newState });
    }
  }

  buttonId(_, button) {
    return button.state;
  }

}
