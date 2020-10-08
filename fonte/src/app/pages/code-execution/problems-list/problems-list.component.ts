import { Component, OnInit } from '@angular/core';
import { ProblemStorageService } from '../../../storage/problem-storage.service';
import { ProblemInfo } from '../../../models/problem/problem-info';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../../user/user.service';

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
  importFileForm: FormGroup;

  constructor(
    private problemsStorageService: ProblemStorageService,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.searchSpecificUserForm = this.formBuilder.group({
      username: '',
    });
    this.importFileForm = this.formBuilder.group({
      file: '',
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
    const username = this.searchSpecificUserForm.get('username').value;
    if (!username) {
      this.specificUserProblems = [];
      return;
    }

    this.loadingSpecificUser = true;
    this.problemsStorageService.list(username)
      .then(problemsInfo => this.specificUserProblems = problemsInfo)
      .catch(err => {
        if (err.status === 404) {
          return [];
        }
        console.error(err);
        throw err;
      })
      .finally(() => this.loadingSpecificUser = false);
  }

}
