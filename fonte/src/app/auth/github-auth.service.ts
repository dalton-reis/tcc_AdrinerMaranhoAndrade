import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GithubAuthService {

  private static SMALG_GITHUB_API = environment.api + '/github';

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
  ) {}

  requestAuthorization() {
    this.http.get<{ url: string}> (`${GithubAuthService.SMALG_GITHUB_API}/authorize`)
      .subscribe(({ url }) => window.location.replace(url));
  }

  login(): Promise<any> {
    return new Promise((resolve, reject) => this.activatedRoute.queryParams.subscribe(({ code }) => {
      this.getLoginData(code).then(resolve).catch(reject);
    }));
  }

  private getLoginData(code: string): Promise<{}> {
    return this.http.post(`${GithubAuthService.SMALG_GITHUB_API}/auth`, { code }, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .toPromise();
  }

}
