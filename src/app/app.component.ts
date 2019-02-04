import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'popper.js';
import 'bootstrap';
import { LoginServiceService } from 'src/provider/login-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { PopupService } from 'src/provider/popup.service';
import { ClassService } from 'src/provider/class.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  userLoggedIn: boolean;
  teacherLoggedIn: any;
  studentLoggedIn: any;
  popupOpen: boolean;
  constructor(private loginService: LoginServiceService, private router: Router, public popupService: PopupService,
    public classService: ClassService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        const userDataLocalStorage = JSON.parse(localStorage.getItem('userData'));
        if (userDataLocalStorage !== null) {
          this.userLoggedIn = true;
          this.teacherLoggedIn = true;
        } else {
          this.userLoggedIn = false;
        }
      }
    });
  }
  ngOnInit() {
    this.loginService.checkLogin.subscribe(
      checkLogin => {
        if (checkLogin === true) {
          this.userLoggedIn = true;
          this.teacherLoggedIn = true;
        } else if (checkLogin === false) {
          this.userLoggedIn = false;
        }
      }
    );
    this.popupService.popupState.subscribe(
      popupState => {
          this.popupOpen = popupState;
          if (popupState === true) {
            document.body.className = 'overflowHidden';
          } else {
            document.body.className = '';
          }
      }
    );
  }
}
