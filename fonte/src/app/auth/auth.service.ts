import { Injectable } from '@angular/core';
import { GithubAuthService } from './github-auth.service';
import { CookieService } from 'ngx-cookie-service';

export interface AuthData {

  token: string;

}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private githubAuth: GithubAuthService,
    private cookieService: CookieService,
  ) {}

  static AUTH_REDIRECT_KEY = 'smalg.platform.auth.redirect.url';
  private static AUTH_DATA_KEY = 'smal.platform.auth.data';

  getData(): AuthData | undefined {
    const cookieValue = this.cookieService.get(AuthService.AUTH_DATA_KEY);
    if (!cookieValue) {
      return;
    }
    const data = JSON.parse(cookieValue);
    return {
      token: data.access_token,
    };
  }

  requestAuthorization() {
    localStorage.setItem(AuthService.AUTH_REDIRECT_KEY, window.location.href);
    this.githubAuth.requestAuthorization();
  }

  login(): Promise<void> {
    return this.githubAuth.login()
      .then(data => this.cookieService.set(
        AuthService.AUTH_DATA_KEY,
        JSON.stringify(data),
        // expires da lib ta bugado
        { expires: data.expires_in, path: '/' },
      ));
  }

  logout() {
    this.cookieService.delete(AuthService.AUTH_DATA_KEY, '/');
  }

}
