import { Injectable } from '@angular/core';
import { ProblemInfo } from '../models/problem/problem-info';
import { Problem } from '../models/problem/problem';
import { AuthService } from '../auth/auth.service';
import { GithubStorageService } from './github-storage.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProblemStorageService {

  constructor(
    private authService: AuthService,
    private githubStorageService: GithubStorageService,
    private http: HttpClient,
  ) { }

  async save(problem: Problem): Promise<string> {
    const authData = this.authService.getData();
    if (!authData) {
      throw Error('Not authenticated');
    }
    return this.githubStorageService.save(authData, problem);
  }

  async load(problemSource: string | File): Promise<Problem> {
    const authData = this.authService.getData();
    if (!authData) {
      throw Error('Not authenticated');
    }
    return await (typeof problemSource === 'string' ?
      this.loadFromUrl(problemSource) :
      this.readFromFile(problemSource));
  }

  private async loadFromUrl(url: string): Promise<Problem> {
    // @ts-ignore-start
    return this.http.get <Problem>(url, { responseType: 'arraybuffer' })
    // @ts-ignore-end
      .toPromise()
      // github return file as utf8 encode but actually is ISO-8859-1.
      // there is no way to set by api the enconding of the repository.
      .then((buffer: ArrayBuffer) => new TextDecoder('ISO-8859-1').decode(buffer))
      .then(response => JSON.parse(response));
  }

  private async readFromFile(problemFile: File): Promise<Problem> {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = e => {
        const contents = e.target.result;
        resolve(JSON.parse(contents as string));
      };
      reader.onerror = err => reject(err);
      // github return file as utf8 encode but actually is ISO-8859-1.
      // there is no way to set by api the enconding of the repository.
      reader.readAsText(problemFile, 'ISO-8859-1');
    });
  }

  async list(username?: string): Promise<ProblemInfo[]> {
    const authData = this.authService.getData();
    if (!authData) {
      throw Error('Not authenticated');
    }
    return this.githubStorageService.list(authData, username);
  }

}
