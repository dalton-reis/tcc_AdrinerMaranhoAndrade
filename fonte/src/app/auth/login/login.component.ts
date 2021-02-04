import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  @Input() message: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  requestLogin() {
    this.authService.requestAuthorization();
  }

}
