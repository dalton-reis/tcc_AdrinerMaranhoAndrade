import { Injectable } from '@angular/core';
import { Problem } from '../../models/problem/problem';
import { ProblemInfo } from '../../models/problem/problem-info';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProblemStorageService {

  constructor(private authService: AuthService) { }

  async save(problem: Problem): Promise<string> {
    const authData = this.authService.getData();
    if (!authData) {
      throw Error('Not authenticated');
    }
    return ;
  }

  async load(url: string): Promise<Problem> {
    const authData = this.authService.getData();
    if (!authData) {
      throw Error('Not authenticated');
    }
    return ;
  }

  async list(): Promise<ProblemInfo[]> {
    const authData = this.authService.getData();
    if (!authData) {
      throw Error('Not authenticated');
    }
    return [];
  }

}
