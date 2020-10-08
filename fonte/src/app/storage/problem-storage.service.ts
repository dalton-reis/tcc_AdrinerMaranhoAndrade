import { Injectable } from '@angular/core';
import { ProblemInfo } from '../models/problem/problem-info';
import { Problem } from '../models/problem/problem';
import { AuthService } from '../auth/auth.service';
import { GithubStorageService } from './github-storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProblemStorageService {

  constructor(
    private authService: AuthService,
    private githubStorageService: GithubStorageService,
  ) { }

  async save(problem: Problem): Promise<string> {
    const authData = this.authService.getData();
    if (!authData) {
      throw Error('Not authenticated');
    }
    return this.githubStorageService.save(authData, problem);
  }

  async load(url: string): Promise<Problem> {
    const authData = this.authService.getData();
    if (!authData) {
      throw Error('Not authenticated');
    }
    return ;
  }

  async list(username?: string): Promise<ProblemInfo[]> {
    const authData = this.authService.getData();
    if (!authData) {
      throw Error('Not authenticated');
    }
    return this.githubStorageService.list(authData, username);
  }

}
