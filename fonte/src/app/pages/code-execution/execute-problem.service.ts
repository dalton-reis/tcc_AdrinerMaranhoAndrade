import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Problem } from '../../models/problem/problem';

const PROBLEM_EXECUTING_KEY = 'smalg.platform.current.problem.executing';

@Injectable({
  providedIn: 'root',
})
export class ExecuteProblemService {

  constructor(private router: Router) {}

  execute(problem: Problem) {
    localStorage.setItem(PROBLEM_EXECUTING_KEY, JSON.stringify(problem));
    this.router.navigate(['pages', 'code-execution', 'execute']);
  }

  loadCurrentProblem(): Problem {
    const currentProblem = localStorage.getItem(PROBLEM_EXECUTING_KEY);
    return currentProblem && JSON.parse(currentProblem);
  }

}
