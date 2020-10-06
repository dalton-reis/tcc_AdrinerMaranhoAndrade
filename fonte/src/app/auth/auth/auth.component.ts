import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.authService.login()
      .then(() => {
        const redirectUrl = localStorage.getItem(AuthService.AUTH_REDIRECT_KEY);
        if (redirectUrl) {
          window.location.replace(redirectUrl);
        } else {
          this.router.navigate(['']);
        }
      })
      .catch(err => console.error(err));
  }

}
