import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from './user';
import { Octokit } from '@octokit/rest';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private authService: AuthService) {}

  async getUser(): Promise<User | void> {
    const authData = this.authService.getData();
    if (!authData) {
      return Promise.resolve();
    }
    const githubApi = new Octokit({ auth: authData.token });
    const { data } = await githubApi.request('/user');
    return {
      name: data.name,
      avatarUrl: data.avatar_url,
    };
  }


}
