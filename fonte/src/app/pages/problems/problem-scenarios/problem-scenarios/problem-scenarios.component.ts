import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-problem-scenarios',
  templateUrl: './problem-scenarios.component.html',
  styleUrls: ['./problem-scenarios.component.scss'],
})
export class ProblemScenariosComponent implements OnInit {

  constructor() { }

  scenarios = [];

  ngOnInit(): void {
  }

  addScenario() {
    this.scenarios.push({ name: 'Custom' });
  }

  removeScenario() {
    this.scenarios = this.scenarios.slice(0, this.scenarios.length - 1);
  }

}
