import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from 'src/provider/login-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  mockDataForNavigation = [];
  userName: string;
  constructor(private loginService: LoginServiceService) {
    this.userName = localStorage.getItem('userName');
    this.getMockDataForTeacher();
  }
  logOut() {
    this.loginService.checkIfLogin(false, '');
    localStorage.removeItem('uesrName');
  }
  getMockDataForTeacher() {
    this.loginService.getMockData().subscribe(
      (res: Response) => {
        this.mockDataForNavigation = res['navigationForTeacher'];
      }
    );
  }
  ngOnInit() {
  }

}
