import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../../../provider/login-service.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  mockDataForNavigation: any = [];
  mockDataForResource: any = [];
  public href = '';
  getMockDataForTeacher() {
    this.loginService.getMockData().subscribe(
      (res: Response) => {
        this.mockDataForNavigation = res['navigationForTeacher'];
      }
    );
  }
  constructor(private loginService: LoginServiceService, private router: Router) {
    this.href = this.router.url;
    this.getMockDataForTeacher();
  }
  ngOnInit() {

  }

}
