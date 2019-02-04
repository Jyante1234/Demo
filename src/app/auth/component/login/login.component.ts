import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../../../provider/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  mockData: any;
  statusResponse: any;
  loginSubmitted = false;
  userData: any;
  constructor(private loginService: LoginServiceService, private router: Router) {
  }

  loginFormSubmit(loginFormValue) {
    this.loginSubmitted = true;
    this.statusResponse = 'Logging in...';
    this.loginService.localLoginFormSubmit(loginFormValue);
  }

  ngOnInit() {
    this.loginService.loginStatusMessage.subscribe(
      loginStatusMessage => {
          this.statusResponse = loginStatusMessage;
      }
    );
  }

}
