import { Component, OnInit } from '@angular/core';
import { ProblemStorageService } from '../../../storage/problem-storage.service';
import { ProblemInfo } from '../../../models/problem/problem-info';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../user/user.service';
import { ExecuteProblemService } from '../execute-problem.service';

@Component({
  selector: 'app-problems-list',
  templateUrl: './problems-list.component.html',
  styleUrls: ['./problems-list.component.scss'],
})
export class ProblemsListComponent implements OnInit {

  currentUserProblems: ProblemInfo[] = [];
  specificUserProblems: ProblemInfo[] = [];

  loadingCurrentUser = true;
  loadingSpecificUser = false;
  loggedIn = false;

  searchSpecificUserForm: FormGroup;

  lastUsernameSearched: string;

  constructor(
    private problemsStorageService: ProblemStorageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private problemExecutionService: ExecuteProblemService,
  ) { }

  ngOnInit(): void {
    this.searchSpecificUserForm = this.formBuilder.group({
      username: '',
    });
    this.userService.getUser()
      .then(user => this.loggedIn = Boolean(user))
      .then(() => {
        if (this.loggedIn) this.listCurrentUserProblems();
      })
      .catch(() => this.loggedIn = false)
      .finally(() => this.loadingCurrentUser = false);
  }

  listCurrentUserProblems() {
    return this.problemsStorageService.list()
      .catch(err => {
        if (err.status === 404) {
          return [];
        }
        console.error(err);
        throw err;
      })
      .then(problemsInfo => this.currentUserProblems = problemsInfo)
      .finally(() => this.loadingCurrentUser = false);
  }

  searchSpecificUserProblems() {
    this.lastUsernameSearched = this.username;
    if (!this.username) {
      this.specificUserProblems = [];
      return;
    }

    this.loadingSpecificUser = true;
    this.problemsStorageService.list(this.username)
      .catch(err => {
        if (err.status === 404) {
          return [];
        }
        console.error(err);
        throw err;
      })
      .then(problemsInfo => this.specificUserProblems = problemsInfo)
      .finally(() => this.loadingSpecificUser = false);
  }

  async fileSelected(file: File) {
    const problem = await this.problemsStorageService.load(file);
    this.problemExecutionService.execute(problem);
  }

  get username() {
    return this.searchSpecificUserForm.get('username').value;
  }

}
