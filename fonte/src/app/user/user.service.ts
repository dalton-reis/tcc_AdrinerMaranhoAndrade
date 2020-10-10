import { Injectable, Injector } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from './user';
import { Octokit } from '@octokit/rest';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private injector: Injector) {}

  private user: User;

  async getUser(): Promise<User | void> {
    const authData = this.injector.get(AuthService).getData();
    if (!authData) {
      return Promise.resolve();
    }
    if (this.user) {
      return this.user;
    }
    const githubApi = new Octokit({ auth: authData.token });
    const { data } = await githubApi.request('/user');
    this.user = {
      login: data.login,
      name: data.name,
      avatarUrl: data.avatar_url,
    };
    return this.user;
  }

  clearUser() {
    this.user = null;
  }

}
