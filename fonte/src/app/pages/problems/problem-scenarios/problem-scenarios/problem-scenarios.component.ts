import { Component, OnInit, Input } from '@angular/core';
import { ClassContract } from '../../../../models/problem/problem-contract';

@Component({
  selector: 'app-problem-scenarios',
  templateUrl: './problem-scenarios.component.html',
  styleUrls: ['./problem-scenarios.component.scss'],
})
export class ProblemScenariosComponent implements OnInit {

  constructor() { }

  @Input() contract: ClassContract;

  scenarios = [];

  ngOnInit(): void {}

  addScenario() {
    this.scenarios.push({ name: 'Custom' });
  }

  removeScenario() {
    this.scenarios = this.scenarios.slice(0, this.scenarios.length - 1);
  }

}
