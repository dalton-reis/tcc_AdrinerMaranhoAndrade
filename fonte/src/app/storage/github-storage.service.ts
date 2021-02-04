import { Injectable } from '@angular/core';
import { AuthData } from '../auth/auth.service';
import { Octokit } from '@octokit/rest';
import { Problem } from '../models/problem/problem';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { ProblemInfo } from '../models/problem/problem-info';
import { NgControlStatus } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GithubStorageService {

  constructor(
    private userService: UserService,
  ) {}

  private SMALG_REPOSITORY_NAME = '_smalg-platform-problems';
  private EXTENSION_TYPE = 'smgplt';

  async save(authData: AuthData, problem: Problem): Promise<string> {
    const user = await this.userService.getUser();
    if (!user) throw Error('User not defined');

    const owner = user.login;
    const repo = this.SMALG_REPOSITORY_NAME;
    const path = `smalg-problems/${problem.name}.${this.EXTENSION_TYPE}`;

    const githubApi = new Octokit({ auth: authData.token });
    let sha = null;
    try {
      const currentFileReponse = await githubApi.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner,
        repo,
        path,
      });
      sha = currentFileReponse.data.sha;
    } catch (err) {
      sha = null;
    }

    await this.createRepositoryIfNotExists(user, githubApi);

    await githubApi.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner,
      repo,
      path,
      message: 'Smalg problem',
      content: btoa(JSON.stringify(problem)),
      sha,
    });

    return null;
  }

  private async createRepositoryIfNotExists(user: User, githubApi: Octokit) {
    try {
      return await githubApi.request('GET /repos/{owner}/{repo}', {
        owner: user.login,
        repo: this.SMALG_REPOSITORY_NAME,
      });
    } catch (err) {
      if (err.status === 404) {
        return await this.createRepository(githubApi);
      }
      throw err;
    }
  }

  private async createRepository(githubApi: Octokit) {
    return await githubApi.request('POST /user/repos', {
      name: this.SMALG_REPOSITORY_NAME,
    });
  }

  async list(authData: AuthData, username?: string): Promise<ProblemInfo[]> {
    const user = await this.userService.getUser();
    if (!user) throw Error('User not defined');

    const githubApi = new Octokit({ auth: authData.token });
    const contents = await githubApi.request('GET /repos/{owner}/{repo}/contents/{path}', {
      owner: username || user.login,
      repo: this.SMALG_REPOSITORY_NAME,
      path: `smalg-problems`,
    });
    return contents.data
      .filter(content => content.type === 'file' && content.name.endsWith(`.${this.EXTENSION_TYPE}`))
      .map(content => ({
        name: content.name.substring(0, content.name.length - (this.EXTENSION_TYPE.length + 1)),
        downloadUrl: content.download_url,
      }));
  }

}
