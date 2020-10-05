import { Injectable } from '@angular/core';
import { Problem } from '../../models/problem/problem';
import { ProblemInfo } from '../../models/problem/problem-info';

@Injectable({
  providedIn: 'root',
})
export class ProblemStorageService {

  constructor() { }

  async save(problem: Problem): Promise<string> {
    throw Error('not implemented');
  }

  async load(url: string): Promise<Problem> {
    throw Error('not implemented');
  }

  async list(): Promise<ProblemInfo[]> {
    throw Error('not implemented');
  }

}
