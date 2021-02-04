import { Component, OnInit } from '@angular/core';
import { Problem } from '../../../models/problem/problem';
import { ExecuteProblemService } from '../execute-problem.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-problem-execution',
  templateUrl: './problem-execution.component.html',
  styleUrls: ['./problem-execution.component.scss'],
})
export class ProblemExecutionComponent implements OnInit {

  problem: Problem;

  constructor(
    private router: Router,
    private problemExecutionService: ExecuteProblemService,
  ) { }

  ngOnInit(): void {
    this.problem = this.problemExecutionService.loadCurrentProblem();
    if (!this.problem) {
      this.router.navigate(['pages', 'code-execution']);
    }
    this.problem.description = this.fixSpacing(this.problem.description);
  }

  /**
   * Bug in the visual text editor.
   * Copy and paste will generate spaces as &nbsp; and that will break the text rendering.
   */
  private fixSpacing(value: string) {
    return value.replace(/&nbsp;/g, ' ');
  }

}
