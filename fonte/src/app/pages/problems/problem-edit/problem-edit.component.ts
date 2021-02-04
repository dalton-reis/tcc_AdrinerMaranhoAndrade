import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../user/user.service';
import { ProblemStorageService } from '../../../storage/problem-storage.service';
import { ProblemInfo } from '../../../models/problem/problem-info';
import { Problem } from '../../../models/problem/problem';

@Component({
  selector: 'ngx-problem-edit',
  templateUrl: './problem-edit.component.html',
  styleUrls: ['./problem-edit.component.scss'],
})
export class ProblemEditComponent implements OnInit {

  currentUserProblems: ProblemInfo[] = [];

  loading = false;
  loggedIn = false;
  problem: Problem;

  constructor(
    private userService: UserService,
    private problemStorageService: ProblemStorageService,
  ) { }

  ngOnInit(): void {
    this.userService.getUser()
      .then(user => this.loggedIn = Boolean(user))
      .then(() => {
        if (this.loggedIn) this.listCurrentUserProblems();
      })
      .catch(() => this.loggedIn = false)
      .finally(() => this.loading = false);
  }

  listCurrentUserProblems() {
    return this.problemStorageService.list()
      .catch(err => {
        if (err.status === 404) {
          return [];
        }
        console.error(err);
        throw err;
      })
      .then(problemsInfo => this.currentUserProblems = problemsInfo)
      .finally(() => this.loading = false);
  }

  async fileSelected(file: File) {
    const problem = await this.problemStorageService.load(file);
    this.editProblem(problem);
  }

  editProblem(problem: Problem) {
    this.problem = problem;
  }

}
